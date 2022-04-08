import {
  Body,
  Controller,
  Get, HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import {ApiCreatedResponse,  ApiTags} from "@nestjs/swagger";
import {DtoAuth} from "../dto/dto.auth";
import {AuthService} from "./auth.service";
import {UserService} from "../user/user.service";
import {AuthGuard} from "@nestjs/passport";
import {MailerService} from "../mailer/mailer.service";

@ApiTags('Auth')
@Controller('/api/auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private mailerService: MailerService
  ) {}

  @Post('/create')
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: DtoAuth,
  })
  async PostCreate(@Body() body): Promise<string> {
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
    await this.mailerService.SendEmailRegistration(req.user.email)
    return token
  }

  @Get('/google')
  @UseGuards(AuthGuard('google'))
  @ApiCreatedResponse({
    description: 'Login user through google.',
  })
  async GoogleCreate(@Res() res) {}

  @Get('/google/redirect')
  @UseGuards(AuthGuard('google'))
  @ApiCreatedResponse({
    description: 'redirect google authorisation.',
  })
  async GoogleRedirect(@Req() req) {
    const {password, ...user} = await this.userService.createSocial(req.user);
    const token = await this.authService.JwtToken(user);
    return `<script>window.opener.postMessage(${JSON.stringify({...user, token})},'*'); window.close();</script>`;
  }
}