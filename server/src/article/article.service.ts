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

  async createArticle(
    id: string,
    article: ICreateArticle,
    file: Express.Multer.File,
  ): Promise<string> {
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

  async allArticle(): Promise<DtoArticle[]> {
    return await this.articRepository.find();
  }

  async shortArticle(number: number): Promise<DtoArticle[]> {
    return await this.articRepository.find({
      select: ['id', 'title', 'comments'],
      take: 5,
      skip: number,
    });
  }

  async getList(last: number): Promise<DtoArticle[]> {
    const list = [
      {
        id: 'asdasdas12312asdasdartysdas',
        title:
          'Фото: Перфоманс в Петербурге, где активистка облила себя красной краской, протестуя против действий России на Украине',
        comments: 1,
      },
      {
        id: 'asda3423as123123123dsrtyda2',
        title:
          'ЦБ, «Сбера» и «Лаборатории Касперского» исключили из международного сообщества по борьбе с кибератаками',
        comments: 4,
      },
      {
        id: 'as4234423asdsadasda1hhk2312',
        title:
          'Сайт и страницы Невзорова во «ВКонтакте» и «Дзене» заблокировали после возбуждения дела о «фейках»',
        comments: 6,
      },
      {
        id: 'as4234423as12312casdashazxc',
        title:
          'Швейцарская компания Zurich Insurance отказалась от логотипа Z в соцсетях — это символ российской армии',
        comments: 2,
      },
      {
        id: 'as4234423adasds12312jkjczxc',
        title:
          '«Ашан» объявил о продолжении работы в России, объяснив это потребностями жителей и сохранением сотрудников',
        comments: 7,
      },
      {
        id: 'as4234423adasds1231asd2czxc',
        title:
          'Сын Шумахера разбил болид во время квалификации «Формулы 1» и попал в больницу',
        comments: 5,
      },
      {
        id: 'as4234423a342ds1231asd2czxc',
        title:
          'Рэпер Face заявил об удалении всей своей музыки с российских стримингов из-за ситуации на Украине',
        comments: 2,
      },
      {
        id: 'as4234423a342dasd31asd2czxc',
        title:
          'Сообщества TJ во «ВКонтакте» и «Одноклассниках» заблокировали по решению Генпрокуратуры',
        comments: 9,
      },
    ];

    return list.splice(last, 4);
  }
}
