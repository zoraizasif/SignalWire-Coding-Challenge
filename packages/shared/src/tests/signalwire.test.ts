import { WebSocketServer, WebSocket, RawData } from 'ws';
import { getMessageObject, SharedEnum } from '../index';

let webSocketServer: WebSocketServer;
let client: WebSocket;

const serverPort: number = 8080;
const clientUrl: string = `ws://localhost:${serverPort}`;
const initialDelayForConnectionMs: number = 5;

let initializeServer = () => (webSocketServer) = new WebSocketServer({ port: serverPort });

function waitForClientSocketConnection(socket: WebSocket, callback: any) {
  setTimeout(() => {
    if (socket.readyState === WebSocket.OPEN) {
      if (callback) {
        callback();
      }
      return;
    }
    waitForClientSocketConnection(socket, callback);
  }, initialDelayForConnectionMs);
}

describe('signalwire-sdks-tests', () => {
  beforeEach(() => {
    initializeServer();
  })

  it("the `server` should receive message exactly as sent by the `client`", (done: jest.DoneCallback) => {
    let sentMessage: string;
    client = new WebSocket(clientUrl);
    waitForClientSocketConnection(client, () => {
      const message = getMessageObject(SharedEnum.ClientMessage);
      sentMessage = JSON.stringify(message);
      client.send(sentMessage);
    });
    webSocketServer.on('connection', (server: WebSocket) => {
      server.on('message', (buffer: RawData) => {
        const receivedMessage = buffer.toString();
        expect(receivedMessage).toBe(sentMessage);
        server.close();
      })
        .on('close', () => {
          webSocketServer.close();
          client.close();
          done();
        })
    });
  });


  it("the `client` should receive message exactly as sent by the `server`", (done: jest.DoneCallback) => {
    let sentMessage: string;
    client = new WebSocket(clientUrl);
    webSocketServer.on('connection', (server: WebSocket) => {
      waitForClientSocketConnection(client, () => {

        const message = getMessageObject(SharedEnum.ServerMessage);
        sentMessage = JSON.stringify(message);
        server.send(sentMessage);


        client.onmessage = (buffer) => {
          const receivedMessage = buffer?.data?.toString();
          expect(receivedMessage).toBe(sentMessage);
          server.close();
        }
      });
      server.on('close', () => {
        webSocketServer.close();
        client.close();
        done();
      })
    });
  });

});
