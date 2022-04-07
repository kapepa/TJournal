import {
  Controller,
  Get,
  Put,
  Query,
  Req,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
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
  async Profile (@Req() req): Promise<DtoUser> {
    const {password, ...other}  = await this.userService.findUser('id',req.user.id);
    return other;
  }

  @Put('/file')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  @ApiCreatedResponse({
    description: 'Change picture in user',
  })
  async ChangeFile (@UploadedFile() file: Express.Multer.File, @Query('name') query, @Req() req): Promise<{img: string, name: string}> {
    return {img: await this.fileService.LoadFile(req.user.id, query, file), name: query};
  }
}
