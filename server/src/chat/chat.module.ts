import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnswerEntity, ChatEntity } from './chat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ChatEntity, AnswerEntity])],
  providers: [ChatService],
  controllers: [ChatController],
  exports: [ChatService],
})
export class ChatModule {}
