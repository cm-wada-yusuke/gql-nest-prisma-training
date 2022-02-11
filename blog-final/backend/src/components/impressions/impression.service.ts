import { Injectable } from '@nestjs/common';
import { PrismaService } from '@pb-components/prisma/prisma.service';
import { Impression } from '@prisma/client';
import { CreateImpressionInput } from './interfaces/create-impressions.input';
import { GetImpressionsArgs } from './interfaces/get-impressions.args';

@Injectable()
export class ImpressionService {
  constructor(private readonly prisma: PrismaService) {}

  async search(args: GetImpressionsArgs): Promise<Impression[]> {
    return await this.prisma.impression.findMany({
      where: {
        postId: args.postId,
      },
      take: args.first,
      orderBy: {
        createdAt: args.sortAs,
      },
    });
  }

  async add(input: CreateImpressionInput): Promise<Impression> {
    return await this.prisma.impression.create({
      data: input,
    });
  }
}
