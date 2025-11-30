import { Client } from '@stomp/stompjs';
import type { IMessage, StompSubscription } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

export type MessageCallback = (message: IMessage) => void;

class SocketClient {
  private client: Client | null = null;
  private static instance: SocketClient;
  private connected: boolean = false;

  private constructor() {}

  public static getInstance(): SocketClient {
    if (!SocketClient.instance) {
      SocketClient.instance = new SocketClient();
    }
    return SocketClient.instance;
  }

  public connect(accessToken: string): void {
    if (this.client && this.client.active) {
      return;
    }

    const socketUrl = import.meta.env.DEV
      ? '/ws'
      : import.meta.env.VITE_API_BASE_URL + '/ws';

    this.client = new Client({
      webSocketFactory: () => new SockJS(socketUrl),
      connectHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
      debug: (str) => {
        if (import.meta.env.DEV) {
          console.log(str);
        }
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    this.client.onConnect = (frame) => {
      this.connected = true;
      console.log('WebSocket Connected:', frame);
    };

    this.client.onStompError = (frame) => {
      console.error('Broker reported error: ' + frame.headers['message']);
      console.error('Additional details: ' + frame.body);
    };

    this.client.onWebSocketClose = () => {
      this.connected = false;
      console.log('WebSocket Closed');
    };

    this.client.activate();
  }

  public disconnect(): void {
    if (this.client) {
      this.client.deactivate();
      this.client = null;
      this.connected = false;
    }
  }

  public subscribe(
    topic: string,
    callback: MessageCallback,
  ): StompSubscription | null {
    if (!this.client || !this.connected) {
      console.warn('Cannot subscribe: Client is not connected');
      return null;
    }
    return this.client.subscribe(topic, callback);
  }

  public publish(destination: string, body: any = {}): void {
    if (!this.client || !this.connected) {
      console.warn('Cannot publish: Client is not connected');
      return;
    }
    this.client.publish({
      destination,
      body: JSON.stringify(body),
    });
  }

  public isConnected(): boolean {
    return this.connected;
  }
}

export const socketClient = SocketClient.getInstance();
