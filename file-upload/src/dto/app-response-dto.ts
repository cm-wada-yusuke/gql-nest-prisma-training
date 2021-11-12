export class AppResponseDto {
  constructor(
    public statusCode: number,
    public data: any = undefined,
    public message: string = 'Success',
  ) {}
}
