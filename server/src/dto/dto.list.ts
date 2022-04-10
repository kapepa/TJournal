import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsString, ValidateNested } from 'class-validator';
import { DtoUser } from './dto.user';

class NestedData {
  @IsString()
  name: string;

  @IsBoolean()
  checked: boolean;
}

export class DtoList {
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
  message: NestedData;

  @ApiProperty()
  @ValidateNested()
  best: NestedData;

  @ApiProperty()
  @IsDate()
  created_at: Date;

  @ApiProperty()
  @IsDate()
  updated_at: Date;
}
