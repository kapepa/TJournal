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
  subs: number;

  @ApiProperty()
  @IsNumber()
  listening: number;

  @ApiProperty()
  @IsNumber()
  donate: number;

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
