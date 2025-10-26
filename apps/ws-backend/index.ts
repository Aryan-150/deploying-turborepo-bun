import { prisma } from "@repo/database";
import WebSocket, { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8081 });

wss.on("connection", (ws: WebSocket) => {
  ws.on("open", () => console.log("connction is opened"));

  console.log("connction is established");

  ws.on("message", async (data) => {
    const message = data.toString();
    const parsedMessage = JSON.parse(message);

    console.log(parsedMessage);
    
    await prisma.user.create({
      data: {
        username: parsedMessage.username || Math.random().toString(),
        password: parsedMessage.password || Math.random().toString()
      }
    });

    ws.send("user got added" + parsedMessage);
  })
  
})