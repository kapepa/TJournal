import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsEmail,
  IsNumber,
  IsString,
  MinLength,
} from 'class-validator';
import { DtoSettings } from './dto.settings';
import { DtoList } from './dto.list';
import { DtoMessage } from './dto.message';
import { DtoArticle } from './dto.article';
import { DtoSubscribe } from './dto.subscribe';

export class DtoUser {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty({ type: () => DtoSettings })
  settings?: DtoSettings;

  @ApiProperty({ type: () => DtoList })
  list?: DtoList;

  @ApiProperty({ type: () => DtoMessage })
  message?: DtoMessage;

  @ApiProperty({ type: () => DtoArticle })
  article?: DtoArticle[];

  @ApiProperty({ type: () => DtoSubscribe })
  subscribe?: DtoSubscribe;

  @ApiProperty({ type: () => DtoSubscribe })
  listening?: DtoSubscribe;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @MinLength(6)
  password?: string;

  @ApiProperty()
  @IsString()
  avatar: string;

  @ApiProperty()
  cover: string;

  @ApiProperty()
  // @IsArray()
  comments: string[];

  @ApiProperty()
  @IsNumber()
  donate: number;

  @ApiProperty()
  @IsNumber()
  subs: number;

  @ApiProperty()
  @IsBoolean()
  isActive: boolean;

  @ApiProperty()
  @IsDate()
  created_at: Date;

  @ApiProperty()
  @IsDate()
  updated_at: Date;
}
