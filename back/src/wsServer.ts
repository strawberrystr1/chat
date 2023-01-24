import { Express } from "express";
import { WebSocketServer } from "ws";
import { createMessage } from "./services/message.service";
import { IClient } from "./types/types";

const clients: IClient[] = [];

export const wsServer = (expressServer: Express) => {
  const port = process.env.PORT || 4000;

  const wsServer = new WebSocketServer({
    server: expressServer.listen(port),
    host: "astonishing-dinner-production.up.railway.app",
    path: "/"
  });

  wsServer.on("connection", (socket, req) => {
    socket.on("message", async msg => {
      const data = JSON.parse(msg.toString());

      if (data.user) {
        clients.push({ id: data.user, socket });
        return;
      }

      const message = await createMessage(
        data.title,
        data.message,
        data.from,
        data.to
      );

      clients.forEach(client => {
        if (client.id === data.to) {
          client.socket.send(JSON.stringify(message));
        }
      });
    });
  });
};
