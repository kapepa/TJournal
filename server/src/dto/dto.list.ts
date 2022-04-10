import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsString, ValidateNested } from 'class-validator';
import { DtoUser } from './dto.user';

class Nested {
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
  @ValidateNested({ each: true })
  answer: Nested;

  @ApiProperty()
  @ValidateNested({ each: true })
  ratings: Nested;

  @ApiProperty()
  @ValidateNested({ each: true })
  reminders: Nested;

  @ApiProperty()
  @ValidateNested({ each: true })
  message: Nested;

  @ApiProperty()
  @ValidateNested({ each: true })
  best: Nested;

  @ApiProperty()
  @IsDate()
  created_at: Date;

  @ApiProperty()
  @IsDate()
  updated_at: Date;
}
