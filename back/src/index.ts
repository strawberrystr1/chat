import ws from "ws";
import express from "express";

const app = express();

const wsServer = new ws.Server({
  server: app.listen(3000),
  host: "localhost",
  path: "/"
});

wsServer.on("connection", socket => {
  socket.on("message", msg => {
    console.log("meesage received", msg);
    socket.send("hello from server");
  });
});

app.listen( () => console.log("server is ups"));
