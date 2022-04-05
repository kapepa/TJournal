import {Controller, Get, Req, UseGuards} from '@nestjs/common';
import {ApiCreatedResponse} from "@nestjs/swagger";
import {DtoUser} from "../dto/dto.user";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {UserService} from "./user.service";

@Controller('/api/user')
export class UserController {
  constructor(
    readonly userService: UserService
  ) {}

  @Get('/')
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({
    description: 'Receive user data!',
    type: DtoUser,
  })
  async Profile (@Req() req) {
    return await this.userService.findUser('id',req.user.id)
  }
}
