import { Express } from "express";
import ws from "ws";
import { createMessage } from "./services/message.service";
import { IClient } from "./types/types";

const clients: IClient[] = [];

export const wsServer = (expressServer: Express) => {
  const wsServer = new ws.Server({
    server: expressServer.listen(4000),
    host: "localhost",
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
        if (client.id === data.from || client.id === data.to) {
          client.socket.send(JSON.stringify(message));
        }
      });
    });
  });
};
