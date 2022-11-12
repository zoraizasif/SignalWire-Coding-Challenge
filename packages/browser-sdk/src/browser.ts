import { SharedEnum, getMessageObject, IMessage, getAppropriatePrefix } from '@signalwire/shared';

const receivedListClassName: string = '.received-list';
const sentListClassName: string = '.sent-list';
const client: WebSocket = new WebSocket(SharedEnum.WebSocketUrl);

client.onopen = () => {
  console.log(`New client has connected!`);

  client.onmessage = (buffer: MessageEvent) => {
    const messageContent: string = buffer?.data?.toString();
    
    const message: IMessage = getMessageObject(messageContent);
    appendToList(message, true);
  }

  client.onclose = () => {
    console.log("The client has disconnected");
  };

  client.onerror = (error: Event) => {
    console.log(`Some Error occurred: ${error}`);
  }

  setInterval(() => {
    if (client.bufferedAmount == 0) {
      const message = getMessageObject(SharedEnum.ClientMessage);
      client.send(JSON.stringify(message));
      appendToList(message, false);
    }
  }, SharedEnum.IntervalThresholdMs); 
};

console.log(`Listening at ${SharedEnum.WebSocketUrl}...`);

function appendToList(message: IMessage, isInbound: boolean): void {
  const ul: HTMLUListElement = document.querySelector(getAppropriateListClass(isInbound)) as HTMLUListElement;
  const li: HTMLLIElement = document.createElement("li");
  li.appendChild(document.createTextNode(`${getAppropriatePrefix(isInbound)} ${JSON.stringify(message)}`));
  ul.appendChild(li);
}

let getAppropriateListClass = (isInbound: boolean): string => isInbound ? receivedListClassName : sentListClassName;