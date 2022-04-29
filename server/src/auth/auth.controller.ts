import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { DtoAuth } from '../dto/dto.auth';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Auth')
@Controller('/api/auth')
export class AuthController {
  constructor(private authService: AuthService, private userService: UserService) {}

  @Post('/create')
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: DtoAuth,
  })
  async createAuth(@Body() body): Promise<string> {
    const user = await this.userService.createUser(body);
    const token = await this.authService.JwtToken(user);
    return token;
  }

  @Post('/login')
  @UseGuards(AuthGuard('local'))
  @ApiCreatedResponse({
    description: 'Successful login, return token user.',
  })
  async login(@Req() req) {
    const token = await this.authService.JwtToken(req.user);
    return token;
  }

  @Post('/recaptcha')
  @ApiCreatedResponse({
    description: 'Check recaptcha',
  })
  async Recaptcha(@Body() body): Promise<boolean> {
    return await this.authService.CheckRecaptcha(body.recaptcha);
  }

  @Get('/google')
  @UseGuards(AuthGuard('google'))
  @ApiCreatedResponse({
    description: 'Login user through google.',
  })
  async GoogleCreate(@Res() res): Promise<any> {
    return HttpStatus.OK;
  }

  @Get('/google/redirect')
  @UseGuards(AuthGuard('google'))
  @ApiCreatedResponse({
    description: 'redirect google authorisation.',
  })
  async GoogleRedirect(@Req() req) {
    const { password, ...user } = await this.userService.createSocial(req.user);
    const token = await this.authService.JwtToken(user);
    return `<script>window.opener.postMessage(${JSON.stringify({
      token,
    })},'*'); window.close();</script>`;
  }

  @Get('/facebook')
  @UseGuards(AuthGuard('facebook'))
  async facebookLogin(): Promise<any> {
    return HttpStatus.OK;
  }

  @Get('/facebook/redirect')
  @UseGuards(AuthGuard('facebook'))
  async facebookLoginRedirect(@Req() req): Promise<any> {
    const { password, ...user } = await this.userService.createSocial(req.user);
    const token = await this.authService.JwtToken(user);
    return `<script>window.opener.postMessage(${JSON.stringify({
      token,
    })},'*'); window.close();</script>`;
  }
}
