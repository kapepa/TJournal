import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'ws';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SocketGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    console.log('Hello world!');
    return 'Hello world!';
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Client connected: ${client.id}`);
  }
}
