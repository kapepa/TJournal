import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AnswerEntity, ChatEntity } from './chat.entity';
import { getRepository, Repository } from 'typeorm';
import { DtoAnswer, DtoChat } from '../dto/dto.chat';
import { UserService } from '../user/user.service';
import { DtoUser } from '../dto/dto.user';

interface IAnswer {
  answer: string;
  to: string;
  id: string;
}

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(ChatEntity)
    private chatRepository: Repository<ChatEntity>,
    @InjectRepository(AnswerEntity)
    private answerRepository: Repository<AnswerEntity>,
    private userService: UserService,
  ) {}

  async createChat(): Promise<DtoChat> {
    const chat = this.chatRepository.create();
    return await this.chatRepository.save(chat);
  }

  async createAnswer(text: string, user: DtoUser): Promise<DtoAnswer> {
    const answer = this.answerRepository.create({ user, text });
    return await this.answerRepository.save(answer);
  }

  async findChat(key: string, val: string): Promise<DtoChat> {
    return await this.chatRepository.findOne({ [key]: val }, { relations: ['answer', 'answer.user'] });
  }

  async writeAnswer(body: IAnswer, userID: string): Promise<DtoChat> {
    const user = await this.userService.findUser('id', userID);
    if (user && body.to === 'chat') {
      const chat = await this.findChat('id', body.id);
      chat.answer.push(await this.createAnswer(body.answer, user));
      chat.count = chat.answer.length;
      return await this.chatRepository.save(chat).then(async () => await this.findChat('id', body.id));
    }
    // if (user && body.to === 'answer') {}
  }
}
