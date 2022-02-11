import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ProfileModel {
  @Field((type) => String)
  handleName: string;

  @Field((type) => String)
  position: string;

  @Field((type) => String, { nullable: true })
  summary: string;

  @Field((type) => String)
  twitter: string;

  @Field((type) => String)
  github: string;
}
