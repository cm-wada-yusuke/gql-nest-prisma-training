import { Field, InputType } from '@nestjs/graphql';
import { IsEnum, MaxLength } from 'class-validator';

enum StickerEnum {
  Good = 'Good',
  Thanks = 'Thanks',
  Like = 'Like',
}

@InputType()
export class CreateImpressionInput {
  @Field({ nullable: false })
  postId: string;

  @Field({ nullable: false })
  @IsEnum(StickerEnum)
  sticker: string;

  @Field({ nullable: true })
  @MaxLength(200)
  comment?: string;

  @Field({ nullable: true })
  @MaxLength(100)
  twitterId?: string;
}
