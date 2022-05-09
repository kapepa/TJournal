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
  constructor(private authService: AuthService) {}

  @SubscribeMessage('noticeSend')
  @UseGuards(WsAuthGuard)
  @ApiCreatedResponse({
    description: 'The notice where add new message, send out all users who connection to room',
  })
  noticeSend(client: Socket, payload: { articleID: string }) {
    const { articleID } = payload;
    client.broadcast.in(articleID).emit('noticeListening');
  }

  @SubscribeMessage('changeLikesAnswer')
  @UseGuards(WsAuthGuard)
  @ApiCreatedResponse({
    description: 'The likes comment put',
  })
  likesComment(client: Socket, payload: { articleID: string; answerID: string; position: number }) {
    const { articleID, answerID, position } = payload;
    client.broadcast.in(articleID).emit('updateLikesAnswer', { answerID, position });
  }

  @SubscribeMessage('changeLikesArticle')
  @UseGuards(WsAuthGuard)
  @ApiCreatedResponse({
    description: 'The likes article put',
  })
  likesArticle(client: Socket, payload: { articleID: string }) {
    const { articleID } = payload;
    client.broadcast.in(articleID).emit('updateLikesArticle');
  }

  @SubscribeMessage('join')
  @UseGuards(WsAuthGuard)
  @ApiCreatedResponse({
    description: 'Join user to room',
  })
  joinRoom(client: Socket, payload: any) {
    const { articleID } = payload;
    client.join(articleID);
  }

  @SubscribeMessage('leave')
  @UseGuards(WsAuthGuard)
  @ApiCreatedResponse({
    description: 'Leave user of room',
  })
  leaveRoom(client: Socket, payload: { articleID: string }) {
    const { articleID } = payload;
    client.leave(articleID);
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
    client.adapter.rooms.delete(client.id);
    client.adapter.sids.delete(client.id);
    client.nsp.sockets.delete(client.id);
  }

  async handleConnection(client: Socket) {
    const authToken: string = client.handshake?.auth?.token.split(' ').pop();
    if (authToken && authToken !== 'undefined') {
      const { id } = await this.authService.JwtVerify(authToken);

      client.adapter.rooms.delete(client.id);
      client.adapter.sids.delete(client.id);
      client.adapter.rooms.set(id, new Set([id]));
      client.adapter.sids.set(id, new Set([id]));

      client.nsp.sockets.set(id, client.nsp.sockets.get(client.id));
      client.nsp.sockets.delete(client.id);
      client.id = id;
    }
  }
}
