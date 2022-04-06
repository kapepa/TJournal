import {Controller, Get, Put, Req, UploadedFile, UploadedFiles, UseGuards, UseInterceptors} from '@nestjs/common';
import {ApiCreatedResponse} from "@nestjs/swagger";
import {DtoUser} from "../dto/dto.user";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {UserService} from "./user.service";
import {FileInterceptor} from "@nestjs/platform-express";
import {FileService} from "../file/file.service";

@Controller('/api/user')
export class UserController {
  constructor(
    readonly userService: UserService,
    readonly fileService: FileService,
  ) {}

  @Get('/')
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({
    description: 'Receive user data!',
    type: DtoUser,
  })
  async Profile (@Req() req) {
    const {password, ...other}  = await this.userService.findUser('id',req.user.id);
    return other;
  }

  @Put('/icon')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  @ApiCreatedResponse({
    description: 'Change icon in user',
  })
  async ChangeIcon (@UploadedFile() file: Express.Multer.File, @Req() req) {
    const image = await this.fileService.LoadFile(req.user.id, 'avatar', file);
    return image;
  }
}
