import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class GetPostsArgs {
  @Field((type) => [String], { nullable: true })
  type?: string[];
}
