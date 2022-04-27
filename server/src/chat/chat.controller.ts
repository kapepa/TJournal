import { Body, Controller, Get, Put, Query, Req, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { ChatService } from './chat.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { DtoAnswer, DtoChat } from '../dto/dto.chat';

@ApiTags('Chat')
@Controller(`/api/chat`)
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Get('/answer')
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({
    description: 'create',
    type: DtoAnswer,
  })
  async loadAnswer(@Query() query, @Req() req): Promise<any> {
    const { id, length } = query;
    return await this.chatService.findAnswerAll(id, length);
  }

  @Put('/message')
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({
    description: 'create',
    type: DtoChat,
  })
  async messageChat(@Body() body, @Req() req): Promise<DtoChat> {
    return await this.chatService.writeAnswer(body, req.user.id);
  }

  @Put('/likes')
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({
    description: 'change data in comments',
    type: DtoAnswer,
  })
  async likeAnswer(@Body() body, @Req() req): Promise<DtoAnswer> {
    return await this.chatService.checkLike(req.user.id, body);
  }
}
