import { Injectable } from '@nestjs/common';
import DtoArticle from '../dto/dto.article';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArticleEntity } from './article.entity';
import { UserService } from '../user/user.service';
import { FileService } from '../file/file.service';

interface ICreateArticle {
  title: string;
  text: string;
  file: File;
}

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private articRepository: Repository<ArticleEntity>,
    private userService: UserService,
    private fileService: FileService,
  ) {}

  async createArticle(id: string, article: ICreateArticle, file: Express.Multer.File): Promise<string> {
    const user = await this.userService.findUser('id', id);
    const fileName = await this.fileService.LoadFile(file);
    const createArticle = await this.articRepository.create({
      ...article,
      image: [fileName],
      user,
    });
    const saveArticle = await this.articRepository.save(createArticle);
    return saveArticle.id;
  }

  async findArticle(key: string, val: string): Promise<DtoArticle> {
    return await this.articRepository.findOne({ [key]: val });
  }

  async allArticle(number: number): Promise<DtoArticle[]> {
    return await this.articRepository.find({
      order: { created_at: 'DESC' },
      take: 5,
      skip: number,
    });
  }

  async shortArticle(number: number): Promise<DtoArticle[]> {
    return await this.articRepository.find({
      select: ['id', 'title', 'comments'],
      order: { created_at: 'DESC' },
      take: 5,
      skip: number,
    });
  }

  async deleteArticle(articleID: string): Promise<any> {
    await this.articRepository.delete({ id: articleID });
    return await this.allArticle(0);
  }
}
