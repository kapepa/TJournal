import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AnswerEntity, ChatEntity } from './chat.entity';
import { Repository } from 'typeorm';

interface IAnswer {
  answer: string;
  to: string;
}

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(ChatEntity)
    private chatRepository: Repository<ChatEntity>,
    @InjectRepository(AnswerEntity)
    private answerRepository: Repository<AnswerEntity>,
  ) {}

  async createChat(): Promise<any> {
    const chat = this.chatRepository.create();
    return await this.chatRepository.save(chat);
  }

  async createAnswer(): Promise<any> {
    const answer = this.answerRepository.create();
    return await this.answerRepository.save(answer);
  }

  async writeAnswer(body: IAnswer, userID: string, answerID: string): Promise<any> {
    return '';
  }
}
