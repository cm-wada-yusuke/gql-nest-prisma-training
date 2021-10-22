import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import * as path from 'path';
import { GreetingModule } from './greeting/greeting.module';

@Module({
  imports: [
    GreetingModule,
    GraphQLModule.forRoot({
      autoSchemaFile: path.join(process.cwd(), 'src/schema.gql'),
      // typePaths: ['./**/*.graphql'],
      // definitions: {
      //   path: path.join(process.cwd(), 'src/graphql.ts'),
      // },
      debug: true,
      playground: true,
    }),
  ],
})
export class AppModule {}
