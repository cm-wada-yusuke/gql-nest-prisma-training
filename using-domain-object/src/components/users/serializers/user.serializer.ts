import { User } from '@prisma/client';

export class UserSerializer {
  protected constructor(
    readonly id: number,
    readonly name: string,
    readonly email?: string,
  ) {}

  static fromModel(model: User): UserSerializer {
    return new this(model.id, model.name, model.email);
  }
}
