import { ApiProperty } from '@nestjs/swagger';
import { IsAlphanumeric, IsAscii, IsEmail, MinLength } from 'class-validator';
import { Field, InputType, ObjectType } from 'type-graphql';
import { User } from '../users/users.entity';

@InputType()
export class SignUpInput implements Partial<User> {
  @ApiProperty()
  @Field()
  @IsAlphanumeric()
  @MinLength(1)
  readonly name: string;

  @ApiProperty()
  @Field()
  @IsEmail()
  @MinLength(1)
  readonly email: string;

  @ApiProperty()
  @Field()
  @IsAscii()
  @MinLength(8)
  readonly password: string;
}

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

@ObjectType()
export class SignInResult extends User {
  @Field()
  readonly token: string;
}
