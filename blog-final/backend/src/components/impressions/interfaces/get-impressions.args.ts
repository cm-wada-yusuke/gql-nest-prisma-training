import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class GetImpressionsArgs {
  @Field({ nullable: true })
  postId?: string;

  @Field((type) => Int, { nullable: true })
  first?: number;

  @Field({ defaultValue: 'desc' })
  sortAs?: 'asc' | 'desc';
}
