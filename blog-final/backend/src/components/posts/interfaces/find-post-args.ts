import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class FindPostArgs {
  @Field((type) => String, { nullable: true })
  contentPath?: string;

  @Field((type) => String, { nullable: true })
  id?: string;
}
