import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'ws';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { UseGuards } from '@nestjs/common';
import WsAuthGuard from './ws-auth.guard';
import { AuthService } from '../auth/auth.service';

@ApiTags('socket')
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SocketGateway {
  @WebSocketServer()
  server: Server;
  private RoomMap = new Map<string, string[]>();
  private Online = new Map();
  constructor(private authService: AuthService) {}

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
    console.log(this.Online.has(client.id));
    if (this.Online.has(client.id)) {
      client.leave('online');
      client.broadcast.to('online').emit('offline', this.Online.get(client.id));
      this.Online.delete(client.id);
    }
  }

  async handleConnection(client: Socket) {
    const authToken: string = client.handshake?.auth?.token.split(' ').pop();
    // console.log(client.id);
    if (authToken && authToken !== 'undefined') {
      const { id } = await this.authService.JwtVerify(authToken);
      this.Online.set(client.id, id);
      client.join('online');
      client.broadcast.to('online').emit('online', id);
      client.emit('allOnline', [...this.Online.values()]);
    }
  }
}
