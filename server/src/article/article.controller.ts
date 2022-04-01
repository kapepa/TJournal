import {Controller, Get, Query} from '@nestjs/common';
import { ArticleService } from './article.service'
import {ApiCreatedResponse, ApiTags} from "@nestjs/swagger";
import DtoArticle from "../dto/dto.article";

@ApiTags('Article')
@Controller(`/api/article`)
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get('/list')
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: DtoArticle,
  })
  async getList(@Query() query): Promise<DtoArticle[]> {
    const { last } = query;
    return await this.articleService.getList(Number(last));
  }
}
