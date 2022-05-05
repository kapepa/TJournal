import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { AuthService } from '../auth/auth.service';

@Injectable()
export default class WsJwtGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const client = context.switchToWs().getClient();
      const authToken: string = client.handshake?.auth?.token.split(' ').pop();
      const user = await this.authService.JwtVerify(authToken);
      context.switchToHttp().getRequest().user = user;

      return Boolean(user);
    } catch (err) {
      throw new WsException(err.message);
    }
  }
}
