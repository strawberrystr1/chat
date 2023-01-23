import ws from "ws";

export enum HTTPCodes {
  NOT_FOUND = 404,
  BAD_REQUEST = 400,
  INTERNAL_ERROR = 500
}

export interface IClient {
  id: number;
  socket: ws.WebSocket;
}
