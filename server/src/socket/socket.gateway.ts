import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'ws';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { UseGuards } from '@nestjs/common';
import WsAuthGuard from './ws-auth.guard';

@ApiTags('socket')
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SocketGateway {
  @WebSocketServer()
  server: Server;
  private roomMap = new Map<string, string[]>();

  @SubscribeMessage('join')
  @UseGuards(WsAuthGuard)
  @ApiCreatedResponse({
    description: 'Join user to room',
  })
  joinRoom(client: Socket, payload: any) {
    // const { room } = payload;
    // client.join(room, { userId: client.user.id });
    // client.broadcast.to(room).emit([]);

    // console.log(client.user.id);
    // console.log(client.adapter.rooms.get(room));
    return 'Hello world!';
  }

  @SubscribeMessage('leave')
  @UseGuards(WsAuthGuard)
  @ApiCreatedResponse({
    description: 'Leave user of room',
  })
  leaveRoom(client: Socket, payload: any) {
    const { room } = payload;
  }

  handleDisconnect(client: Socket) {
    // console.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket) {
    const authToken: string = client.handshake?.auth?.token.split(' ').pop();
    // if(authToken)
    // client.id = client.user.id;
    console.log(authToken);
    // console.log(`Client connected: ${client.id}`);
  }
}
