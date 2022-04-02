import {ApiProperty} from "@nestjs/swagger";

export class DtoAuth {
  @ApiProperty()
  readonly name: string

  @ApiProperty()
  readonly email: string

  @ApiProperty()
  readonly password: string
}