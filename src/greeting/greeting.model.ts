import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'recipe ' })
export class Greeting {
  @Field()
  hello: string;
}
