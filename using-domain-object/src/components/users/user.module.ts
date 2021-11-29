/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserRepository } from './repositories/user.repository';
import { UserContentController } from './user-content.controller';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [PrismaService],
  controllers: [UserController, UserContentController],
  providers: [PrismaService, UserService, UserRepository],
})
export class UserModule {}
