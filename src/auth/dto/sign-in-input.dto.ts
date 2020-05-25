import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsAlphanumeric, IsAscii, MinLength } from 'class-validator';

import { User } from '../../users/users.entity';

@InputType()
export class SignInInput implements Partial<User> {
  @ApiProperty()
  @Field()
  @IsAlphanumeric()
  @MinLength(1)
  readonly name: string;

  @ApiProperty()
  @Field()
  @IsAscii()
  @MinLength(8)
  readonly password: string;
}
