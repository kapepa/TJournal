import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AnswerEntity, ChatEntity } from './chat.entity';
import { Repository } from 'typeorm';
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

  async findAnswerAll(id: string, skip: number): Promise<DtoAnswer[]> {
    return await this.answerRepository.find({
      where: { chat: { id } },
      relations: ['user'],
      order: { created_at: 'DESC' },
      take: 5,
      skip,
    });
  }

  async findAnswerOne(key: string, val: string): Promise<DtoAnswer> {
    return await this.answerRepository.findOne({ [key]: val }, { relations: ['user'] });
  }

  async findChat(key: string, val: string): Promise<DtoChat> {
    return await this.chatRepository.findOne({ [key]: val });
  }

  async writeAnswer(body: IAnswer, userID: string): Promise<DtoChat> {
    const user = await this.userService.findUser('id', userID);
    if (user && body.to === 'chat') {
      const chat = await this.findChat('id', body.id);
      chat.answer.sort().push(await this.createAnswer(body.answer, user));
      chat.count = chat.answer.length;
      return await this.chatRepository.save(chat).then(async () => await this.findChat('id', body.id));
    }
    // if (user && body.to === 'answer') {}
  }

  async checkLike(answerID: string, userID: string, data: IAnswer): Promise<any> {
    const user = await this.findAnswerOne('id', answerID);
    console.log(user, 'make check method');
    return await this.changeAnswer('id', answerID, data);
  }

  async changeAnswer(key: string, val: string, data: IAnswer): Promise<any> {
    return this.answerRepository.update({ [key]: val }, data).then(() => this.findAnswerOne('id', val));
  }
}
