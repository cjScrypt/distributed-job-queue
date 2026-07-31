import express from "express";
import 'reflect-metadata';
import { json, urlencoded } from 'body-parser';

import { PORT } from "../config";
import { DatabaseClient } from "../database";
import { jobRouter } from "./routers";
import { appErrorHandler } from "./middlewares";

const apiApp = () => {
  const db = DatabaseClient.getInstance();
  db.connect();

  const app = express();
  app.use(json());
  app.use(urlencoded({ extended: false }));

  app.use(jobRouter);
  app.use(appErrorHandler);

  app.listen(PORT, () => {
    console.log(`======= App running on port ${PORT} =======`);
  })
}

apiApp();
