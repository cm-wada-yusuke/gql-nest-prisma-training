import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql';
import {
  Connection,
  Node,
  PageInfoModel,
} from '@pb-components/connection/interfaces/pagination';

@ObjectType({ implements: () => [Node] })
export class PostModel implements Node {
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

@ObjectType({ implements: () => [Connection] })
export class PostsConnection implements Connection {
  @Field((type) => PageInfoModel, { nullable: false })
  pageInfo: PageInfoModel;

  @Field((type) => [PostModel], { nullable: false })
  nodes: PostModel[];
}
