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

  async findAnswerFull(key: string, val: string): Promise<DtoAnswer> {
    return await this.answerRepository.findOne({ [key]: val }, { relations: ['user', 'answerLikes'] });
  }

  async findChat(key: string, val: string): Promise<DtoChat> {
    return await this.chatRepository.findOne({ [key]: val });
  }

  async findChatFull(key: string, val: string): Promise<DtoChat> {
    return await this.chatRepository.findOne({ [key]: val }, { relations: ['answer'] });
  }

  async writeAnswer(body: IAnswer, userID: string): Promise<DtoChat> {
    const user = await this.userService.findUser('id', userID);
    if (user && body.to === 'chat') {
      const chat = await this.findChatFull('id', body.id);
      const answer = await this.createAnswer(body.answer, user);
      chat.answer.push(answer);
      chat.count = chat.answer.length;
      return await this.chatRepository.save(chat).then(async () => {
        return { ...(await this.findChat('id', body.id)), answer: [answer] };
      });
    }
    // if (user && body.to === 'answer') {}
  }

  async checkLike(userID: string, data: DtoAnswer): Promise<any> {
    const { id, myLikes } = data;
    const user = await this.userService.findUser('id', userID);
    const answer = await this.findAnswerFull('id', id);
    const position = answer.answerLikes.findIndex((el) => el.id === userID);

    if (myLikes && position === -1) answer.answerLikes.push(user);
    if (!myLikes && position !== -1) answer.answerLikes.splice(position, 1);

    answer.myLikes = myLikes;
    answer.likes = answer.answerLikes.length;

    return await this.answerRepository.save(answer).then(async () => await this.findAnswerOne('id', id));
  }
}
