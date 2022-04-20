import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { DtoUser } from './dto.user';
import { DtoArticle } from './dto.article';

export class DtoSubscribe {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty({ type: () => DtoUser })
  user?: DtoUser;

  @ApiProperty({ type: () => DtoUser })
  subscribe?: DtoUser[];

  @ApiProperty({ type: () => DtoArticle })
  article: DtoArticle[];

  @ApiProperty()
  sub: boolean;

  @ApiProperty({ default: 0 })
  subscribers: number;
}
