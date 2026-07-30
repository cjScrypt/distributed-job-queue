import { Pool } from "pg";

import { DATABASE_URL } from "src/config";

export class DatabaseClient {
  private static instance: DatabaseClient | null = null;
  private connection: Pool | null = null;

  constructor() {
    if (DatabaseClient.instance) {
      return DatabaseClient.instance;
    }

    DatabaseClient.instance = this;
    this.connection = null;
  }

  static getInstance() {
    if (!DatabaseClient.instance) {
      DatabaseClient.instance = new DatabaseClient();
    }

    return DatabaseClient.instance;
  }

  connect() {
    if (this.connection) {
      return this.connection;
    }

    this.connection = new Pool({
      connectionString: DATABASE_URL,
      max: 10,
    });

    return this.connection;
  }

  async query(sql: string, params: unknown[]) {
    if (!this.connection) {
      throw new Error('Must connect to database before querying')
    }

    return this.connection.query(sql, params);
  }

  async disconnect() {
    if (!this.connection) {
      return;
    }

    return this.connection.end();
  }
}
