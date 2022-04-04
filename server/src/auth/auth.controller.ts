import {
  Body,
  Controller,
  Get,
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

@ApiTags('Auth')
@Controller('/api/auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService
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
    await this.authService.AuthCreate(req.user.email);
    return token
  }
}