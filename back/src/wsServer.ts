import { Express } from "express";
import ws from "ws";
import { createMessage } from "./services/message.service";

const CREATE_MESSAGE = "message";

export const wsServer = (expressServer: Express) => {
  const wsServer = new ws.Server({
    server: expressServer.listen(4000),
    host: "localhost",
    path: "/"
  });

  wsServer.on("connection", socket => {
    socket.on("message", async msg => {
      const data = JSON.parse(msg.toString());

      const message = await createMessage(
        data.title,
        data.message,
        data.from,
        data.to
      );

      wsServer.clients.forEach(client => {
        if (client !== socket) {
          client.send(JSON.stringify(message));
        }
      });
    });
  });
};
