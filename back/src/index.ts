import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";

import router from "./routes";
import dbClient from "./db";

const startServer = () => {
  dotenv.config();

  const port = process.env.PORT || "4000";
  const app = express();

  app.use(
    cors({
      origin: "*"
    })
  );
  app.use(express.json());
  app.use(
    bodyParser.urlencoded({
      extended: false
    })
  );
  app.use(bodyParser.json());

  app.use(router);

  const runDB = async () => {
    try {
      await dbClient.authenticate();
      await dbClient.sync({ alter: true });

      app.listen(port, () => {
        console.log(`server started at port ${port}`);
      });
    } catch (e) {
      console.log(e);
    }
  };

  runDB();
};

startServer();
