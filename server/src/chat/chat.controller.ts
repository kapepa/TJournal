import {Body, Controller, Put, Query, Req, UseGuards} from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { ChatService } from './chat.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Chat')
@Controller(`/api/chat`)
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Put('/message')
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({
    description: 'create',
  })
  async messageChat(@Body() body, @Req() req, @Query('id') query): Promise<any> {
    return await this.chatService.writeAnswer(body, req.user.id, query);
  }
}
