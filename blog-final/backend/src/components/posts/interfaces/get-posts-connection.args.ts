import { ArgsType, Field, Int } from '@nestjs/graphql';
import { ConnectionArgs } from '@pb-components/connection/interfaces/pagination.args';

@ArgsType()
export class GetPostsArgs {
  @Field((type) => [String], { nullable: true })
  type?: string[];
}

@ArgsType()
export class GetPostsConnectionArgs implements ConnectionArgs {
  @Field((type) => [String], { nullable: true })
  type?: string[];

  @Field((type) => String, { nullable: true })
  cursor?: string;

  @Field((type) => Int, { nullable: true })
  first?: number;

  @Field((type) => Int, { nullable: true })
  last?: number;
}
