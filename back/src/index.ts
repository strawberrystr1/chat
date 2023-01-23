import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dbClient from "./db";
import User from "./models/user.model";
import Message from "./models/message.model";
import { wsServer } from "./wsServer";
import UserMessages from "./models/userMessages.model";
import router from "./routes/index";

const startServer = () => {
  const app = express();

  app.use(cors({ origin: "*" }));
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
      User.sync();
      Message.sync();
      UserMessages.sync();

      User.belongsToMany(Message, { through: UserMessages });
      Message.belongsToMany(User, { through: UserMessages });
      User.hasMany(UserMessages);
      UserMessages.belongsTo(User);
      Message.hasMany(UserMessages);
      UserMessages.belongsTo(Message);

      await dbClient.authenticate();
      await dbClient.sync({ alter: true });

      wsServer(app);
      app.listen(() => console.log("server is up"));
    } catch (e) {
      console.log(e);
    }
  };

  runDB();
};

startServer();
