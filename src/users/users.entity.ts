import { Exclude } from 'class-transformer';
import { Field, ID, Int, ObjectType } from 'type-graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class User {
  @Field(type => ID)
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Field()
  @Index({ unique: true })
  @Column()
  name: string;

  @Field()
  @Index({ unique: true })
  @Column()
  email: string;

  @Exclude({ toPlainOnly: true })
  @Column()
  password: string;

  @Field()
  @CreateDateColumn()
  readonly createAt: Date;

  @Field()
  @UpdateDateColumn()
  readonly updateAt: Date;

  @Field(type => Int)
  @VersionColumn()
  readonly version: number;
}
