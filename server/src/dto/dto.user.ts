import {ApiProperty} from "@nestjs/swagger";

export class DtoUser {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string

  @ApiProperty()
  avatar: string;

  @ApiProperty()
  cover: string;

  @ApiProperty()
  comments: string[];

  @ApiProperty()
  subs: number;

  @ApiProperty()
  listening: number;

  @ApiProperty()
  donate: number;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;
}

