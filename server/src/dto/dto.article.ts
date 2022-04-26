import { ApiProperty } from '@nestjs/swagger';
import { DtoUser } from './dto.user';
import { DtoSubscribe } from './dto.subscribe';
import { DtoChat } from './dto.chat';

export class DtoArticle {
  @ApiProperty()
  id: string;

  @ApiProperty({ type: () => DtoUser })
  user?: DtoUser;

  @ApiProperty({ type: () => DtoSubscribe })
  subscribe?: DtoSubscribe;

  @ApiProperty({ type: () => DtoChat })
  chat?: DtoChat;

  @ApiProperty({ type: () => DtoUser })
  articleLikes?: DtoUser[];

  @ApiProperty()
  myLikes: boolean;

  @ApiProperty()
  likes: number;

  @ApiProperty()
  title?: string;

  @ApiProperty()
  text?: string;

  @ApiProperty()
  type?: string;

  @ApiProperty()
  shortDesc?: string;

  @ApiProperty()
  image?: string[];

  @ApiProperty()
  created_at?: Date;

  @ApiProperty()
  updated_at?: Date;
}
