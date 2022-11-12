export interface IMessage {
  id: number,
  content: string | object,
  sentAt: Date;
}

export enum SharedEnum {
  InBoundMessagePrefix = 'RECV:',
  OutBoundMessagePrefix =  'SEND:',
  ServerMessage = 'This message is from the SDK 👋🤙',
  ClientMessage = 'This message is from the Client',
  IntervalThresholdMs = 5000,
  WebSocketUrl = 'wss://demo.piesocket.com/v3/channel_signalwire?api_key=VCXCEuvhGcBDP7XhiJJUDvR1e1D3eiVjgZ9VRiaV'
}

export function getMessageObject(messageContent: string): IMessage {
  const newMessageObject = { id: getRandomId(), content: messageContent, sentAt: new Date() };
  return newMessageObject;
}

export function getRandomId(): number {
  return Math.floor(Math.random() * 100);
}

export function getAppropriatePrefix(isInbound: boolean): string {
  return isInbound ? SharedEnum.InBoundMessagePrefix : SharedEnum.OutBoundMessagePrefix;
} 