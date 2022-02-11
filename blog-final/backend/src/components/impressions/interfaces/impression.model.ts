import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ImpressionModel {
  @Field((type) => ID)
  id: string;

  @Field((type) => String)
  sticker: string;

  @Field((type) => String, { nullable: true })
  comment?: string;

  @Field((type) => String, { nullable: true })
  twitterId: string;

  @Field((type) => String)
  postId: string;

  @Field((type) => GraphQLISODateTime, { nullable: true })
  createdAt?: Date;
}
