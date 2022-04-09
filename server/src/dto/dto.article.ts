import { ApiProperty } from '@nestjs/swagger';

export default class DtoArticle {
  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  readonly title: string;

  @ApiProperty()
  readonly comments: number;
}
