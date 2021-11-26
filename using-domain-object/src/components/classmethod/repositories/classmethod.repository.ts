import { HttpModule, HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ClassmethodRepository {
  constructor(private client: HttpService) {}

  async top(): Promise<string> {
    const url = `https://classmethod.jp`;
    const res = await firstValueFrom(this.client.get(url));
    console.log(res.data);
    return res.data;
  }
}


async function test() {
    const moduleRef = await Test.createTestingModule({
        imports: [HttpModule],
        providers: [ClassmethodRepository],
    }).compile()

    const repo = moduleRef.get<ClassmethodRepository>(ClassmethodRepository);

    console.log(await repo.top());
}

test();