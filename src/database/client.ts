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
}
