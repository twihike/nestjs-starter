import { Field, ObjectType } from '@nestjs/graphql';

import { User } from '../../users/users.entity';

@ObjectType()
export class SignInResult extends User {
  @Field()
  readonly token: string;
}
