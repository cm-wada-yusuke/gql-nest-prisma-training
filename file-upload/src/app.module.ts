import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import * as path from 'path';
import { GreetingModule } from './modules/greeting/greeting.module';
import { PresentModule } from './modules/present/present.module';

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
    PresentModule,
  ],
})
export class AppModule {}
