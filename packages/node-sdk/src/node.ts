import { WebSocket, WebSocketServer, RawData } from 'ws';
import { appendFile } from "fs";
import { getAppropriatePrefix, getMessageObject, IMessage, SharedEnum } from "@signalwire/shared";

const serverPort: number = 8080;
const webSocketServer = new WebSocketServer({port: serverPort});

webSocketServer.on('connection', (webSocket: WebSocket) => {
  console.log(`New client has connected!`);

  webSocket.on('message', (buffer: RawData) => {
    const messageContent = buffer.toString();
    
    const message = getMessageObject(messageContent);
    console.log('Received', message);
    logToFile(message, true);
  })

  webSocket.on("close", () => {
    console.log("The client has disconnected");
  });

  webSocket.onerror = (error) => {
    console.log(`Some Error occurred: ${error}`);
  }

  setInterval(() => {
    const message = getMessageObject(SharedEnum.ServerMessage);
    logToFile(message, false);
    webSocket.send(JSON.stringify(message));
  }, SharedEnum.IntervalThresholdMs);
  
});

console.log(`Server listening at ${serverPort}...`);

function logToFile(message: IMessage, isInbound: boolean): void {
  appendFile('log.txt', `${getAppropriatePrefix(isInbound)} ${JSON.stringify(message)}\n`, function (err) {
    if (err) return console.log(`Failure:: Append to file. Error: ${err}`);
    console.log('Success:: Append to file');
  });
}