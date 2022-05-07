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
  middlewares: [],
})
export class SocketGateway {
  @WebSocketServer()
  server: Server;
  private ArticleMap = new Map<string, Map<string, string>>();
  constructor(private authService: AuthService) {}

  @SubscribeMessage('join')
  @UseGuards(WsAuthGuard)
  @ApiCreatedResponse({
    description: 'Join user to room',
  })
  joinRoom(client: Socket, payload: any) {
    const { id } = client.user;
    const { articleID } = payload;
    if (!this.ArticleMap.has(articleID)) this.ArticleMap.set(articleID, new Map());

    const article = this.ArticleMap.get(articleID);
    article.set(client.id, id);
    client.join(articleID);
  }

  @SubscribeMessage('leave')
  @UseGuards(WsAuthGuard)
  @ApiCreatedResponse({
    description: 'Leave user of room',
  })
  leaveRoom(client: Socket, payload: any) {
    const { articleID } = payload;
    client.leave(articleID);
    client.broadcast.to(articleID).emit('offline', client.id);
  }

  @SubscribeMessage('exit')
  @ApiCreatedResponse({
    description: 'exit user',
  })
  async exist(client: Socket) {
    await this.existUser(client);
  }

  @SubscribeMessage('online')
  @UseGuards(WsAuthGuard)
  @ApiCreatedResponse({
    description: 'online users',
  })
  async online(client: Socket) {
    if (client.user?.id) {
      client.join('online');
      client.broadcast.in('online').emit('listener', client.id);
      return [...client.adapter.rooms.get('online').values()];
    }
  }

  async existUser(client: Socket) {
    client.leave('online');
    client.broadcast.to('online').emit('offline', client.id);
  }

  async handleDisconnect(client: Socket) {
    await this.existUser(client);
  }

  async handleConnection(client: Socket) {
    const authToken: string = client.handshake?.auth?.token.split(' ').pop();
    if (authToken && authToken !== 'undefined') {
      const { id } = await this.authService.JwtVerify(authToken);

      client.adapter.rooms.delete(client.id);
      client.adapter.sids.delete(client.id);
      client.adapter.rooms.set(id, new Set([id]));
      client.adapter.sids.set(id, new Set([id]));

      const user = client.nsp.sockets.get(client.id);
      user.id = id;
      client.nsp.sockets.delete(client.id);
      client.nsp.sockets.set(id, user);
    }
  }
}
