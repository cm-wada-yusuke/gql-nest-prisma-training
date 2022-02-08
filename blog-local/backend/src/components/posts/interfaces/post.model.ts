import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PostModel {
  @Field((type) => ID)
  id: string;

  @Field((type) => String)
  title: string;

  @Field((type) => String, { nullable: true })
  emoji?: string;

  @Field((type) => String)
  type: string;

  @Field((type) => String, { nullable: true })
  thumbNailUrl: string;

  @Field((type) => String, { nullable: true })
  excerpt?: string;

  @Field((type) => String)
  contentPath: string;

  @Field((type) => Boolean, { nullable: true })
  published: boolean;

  @Field((type) => GraphQLISODateTime, { nullable: true })
  publishDate?: Date;
}
