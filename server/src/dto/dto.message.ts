import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsString, ValidateNested } from 'class-validator';
import { DtoUser } from './dto.user';

class NestedData {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsBoolean()
  checked: boolean;
}

export class DtoMessage {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty({ type: () => DtoUser })
  user?: DtoUser;

  @ApiProperty()
  @ValidateNested()
  answer: NestedData;

  @ApiProperty()
  @ValidateNested()
  ratings: NestedData;

  @ApiProperty()
  @ValidateNested()
  reminders: NestedData;

  @ApiProperty()
  @ValidateNested()
  comments: NestedData;

  @ApiProperty()
  @ValidateNested()
  subscribers: NestedData;

  @ApiProperty()
  @IsDate()
  created_at: Date;

  @ApiProperty()
  @IsDate()
  updated_at: Date;
}
