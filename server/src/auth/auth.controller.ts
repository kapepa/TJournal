import {Controller, Get, Post} from '@nestjs/common';
import {ApiCreatedResponse,  ApiTags} from "@nestjs/swagger";

@ApiTags('Auth')
@Controller('/api/auth')
export class AuthController {
  @Post('/create')
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    // type: DtoArticle,
  })
  PostCreate(): string {
    return 'This action returns all cats';
  }
}