import {Controller, Get} from '@nestjs/common';
import {ApiCreatedResponse, ApiForbiddenResponse, ApiTags} from "@nestjs/swagger";

@ApiTags('Auth')
@Controller('/api/auth')
export class AuthController {
  @Get('/all')
  @ApiCreatedResponse({ description: 'The record has been successfully created.'})
  All(): string {
    return 'This action returns all cats';
  }
}