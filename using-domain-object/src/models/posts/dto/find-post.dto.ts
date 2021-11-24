import { IsNumberString } from 'class-validator';

export class FindPostDto {
  @IsNumberString(
    {},
    {
      message: 'IDは数値です',
    },
  )
  id: number;
}
