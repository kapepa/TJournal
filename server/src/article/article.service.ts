import { Injectable } from '@nestjs/common';
import { DtoArticle } from '../dto/dto.article';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArticleEntity } from './article.entity';
import { UserService } from '../user/user.service';
import { FileService } from '../file/file.service';
import { SubscribeService } from '../subscribe/subscribe.service';
import { ChatService } from '../chat/chat.service';

interface ICreateArticle {
  title: string;
  text: string;
  file: File;
}

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private articleRepository: Repository<ArticleEntity>,
    private userService: UserService,
    private fileService: FileService,
    private subscribeService: SubscribeService,
    private chatService: ChatService,
  ) {}

  async createArticle(id: string, article: ICreateArticle, file: Express.Multer.File): Promise<string> {
    const user = await this.userService.findUser('id', id);
    const subscribe = await this.subscribeService.findSubscribe('id', String(user.subscribe));
    const fileName = await this.fileService.LoadFile(file);
    const chat = await this.chatService.createChat();
    const createArticle = await this.articleRepository.create({
      ...article,
      chat,
      subscribe,
      image: [fileName],
      user,
    });
    const saveArticle = await this.articleRepository.save(createArticle);
    return saveArticle.id;
  }

  async receiveOne(key: string, val: string, userID: string): Promise<DtoArticle> {
    const article = await this.findArticle(key, val);
    const { user, subscribe, ...other } = await this.subscribeService.findFullSubscribe('id', article.subscribe.id);
    const sub = subscribe.some((el) => el.id === userID);
    const chat = await this.chatService.findChat('id', article.chat.id);
    const answer = await this.chatService.findAnswer(article.chat.id, 0);

    return { ...article, subscribe: { ...other, sub }, chat: { ...chat, answer } };
  }

  async findArticle(key: string, val: string): Promise<DtoArticle> {
    return await this.articleRepository.findOne({ [key]: val }, { relations: ['subscribe', 'chat'] });
  }

  async allArticle(number: number, search: string): Promise<DtoArticle[]> {
    const props = { order: { created_at: 'DESC' } } as { where?: any; order?: any };
    const checked = ['created_at', 'likes', 'comments'].includes(search);
    const type = search !== 'all' ? { type: search } : {};

    checked ? (props.order = { [search]: 'DESC' }) : (props.where = type);

    return await this.articleRepository.find({
      ...props,
      take: 5,
      skip: number,
    });
  }

  async shortArticle(number: number): Promise<DtoArticle[]> {
    return await this.articleRepository.find({
      select: ['id', 'title'],
      order: { created_at: 'DESC' },
      take: 5,
      skip: number,
    });
  }

  async updateArticle(key: string, val: string, article: DtoArticle): Promise<any> {
    return await this.articleRepository
      .update({ [key]: val }, { ...article })
      .then(async () => await this.findArticle(key, val));
  }

  async deleteArticle(articleID: string): Promise<any> {
    return await this.articleRepository.delete({ id: articleID });
  }
}
