import { Field, ID, Int, InterfaceType } from '@nestjs/graphql';

@InterfaceType()
export abstract class ConnectionArgs {
  @Field((type) => ID, { nullable: true })
  cursor?: string;

  @Field((type) => Int, { nullable: true })
  first?: number;

  @Field((type) => Int, { nullable: true })
  last?: number;

  // note: どちらか一方みたいなバリデーションをしたかったが難しそう
  // https://github.com/typestack/class-validator/issues/269
}
