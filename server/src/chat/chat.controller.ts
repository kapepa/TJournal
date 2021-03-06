import { Body, Controller, Get, Put, Query, Req, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { ChatService } from './chat.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { DtoAnswer, DtoChat } from '../dto/dto.chat';

@ApiTags('Chat')
@Controller(`/api/chat`)
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Get('/one')
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({
    description: 'get one answer',
    type: DtoAnswer,
  })
  async getOne(@Query('id') query, @Req() req): Promise<any> {
    return await this.chatService.generateAnswerOne(query, req.user.id);
  }

  @Get('/answer')
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({
    description: 'create',
    type: DtoAnswer,
  })
  async loadAnswer(@Query() query, @Req() req): Promise<DtoAnswer[]> {
    const { id, length, take } = query;
    return await this.chatService.findAnswerAll(req.user.id, id, length, take);
  }

  @Get('/select')
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({
    description: 'select chat',
    type: DtoAnswer,
  })
  async selectChat(@Query() query, @Req() req): Promise<DtoChat> {
    const { id, length, take } = query;
    return this.chatService.selectChat(req.user.id, id, length, take);
  }

  @Put('/message')
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({
    description: 'create',
    type: DtoChat,
  })
  async messageChat(@Body() body, @Req() req): Promise<DtoChat | DtoAnswer> {
    return await this.chatService.writeAnswer(body, req.user.id);
  }

  @Put('/append')
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({
    description: 'append answer',
    type: DtoAnswer,
  })
  async answerChat(@Body() body, @Req() req): Promise<DtoAnswer> {
    return await this.chatService.appendAnswer(body, req.user.id);
  }

  @Put('/likes')
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({
    description: 'change data in comments',
    type: DtoAnswer,
  })
  async likeAnswer(@Body() body, @Req() req, @Query('id') query): Promise<DtoAnswer> {
    return await this.chatService.checkLike(req.user.id, query, body);
  }
}
