import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsString } from 'class-validator';
import { DtoUser } from './dto.user';

export class DtoSettings {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty({ type: () => DtoUser })
  user?: DtoUser;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsBoolean()
  online: boolean;

  @ApiProperty()
  @IsString()
  ribbon: string;

  @ApiProperty()
  @IsString()
  sorting: string;

  @ApiProperty()
  @IsString()
  entry: string;

  @ApiProperty()
  @IsString()
  adult: string;

  @ApiProperty()
  @IsDate()
  created_at: Date;

  @ApiProperty()
  @IsDate()
  updated_at: Date;
};
