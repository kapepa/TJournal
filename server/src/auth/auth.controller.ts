import {Body, Controller, Get, Post, Req, UseGuards} from '@nestjs/common';
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
    return 'This action returns all cats';
  }

  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@Req() req) {
    console.log(req.user)
    return req.user;
  }
}