import { ApiProperty } from '@nestjs/swagger';
import { DtoUser } from './dto.user';

export default class DtoArticle {
  @ApiProperty()
  id: string;

  @ApiProperty({ type: () => DtoUser })
  user?: DtoUser;

  @ApiProperty()
  title?: string;

  @ApiProperty()
  type?: string;

  @ApiProperty()
  shortDesc?: string;

  @ApiProperty()
  text?: string;

  @ApiProperty()
  image?: string[];

  @ApiProperty()
  likes?: number;

  @ApiProperty()
  сhat?: string;

  @ApiProperty()
  comments?: number;

  @ApiProperty()
  created_at?: Date;

  @ApiProperty()
  updated_at?: Date;
}
