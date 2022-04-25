import { Body, Controller, Put, Query, Req, UseGuards} from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { ChatService } from './chat.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { DtoAnswer, DtoChat } from '../dto/dto.chat';

@ApiTags('Chat')
@Controller(`/api/chat`)
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Put('/message')
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({
    description: 'create',
  })
  async messageChat(@Body() body, @Req() req): Promise<DtoChat> {
    return await this.chatService.writeAnswer(body, req.user.id);
  }

  @Put('/change')
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({
    description: 'change data in comments',
  })
  async likeAnswer(@Body() body, @Req() req): Promise<DtoAnswer> {
    const { id, user, ...other } = body;
    return await this.chatService.checkLike(id, req.user.id, other);
  }
}
