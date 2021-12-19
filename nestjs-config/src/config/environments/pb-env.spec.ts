import { Test } from '@nestjs/testing';
import { PbEnvModule } from './pb-env.module';
import { PbEnv } from './pb-env.service';

describe('Config', () => {
  let pvEnv: PbEnv;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [PbEnvModule],
    }).compile();

    pvEnv = moduleRef.get(PbEnv);
  });

  it('.env.test.local に記載されている場合はテスト時優先されること', async () => {
    expect(pvEnv.service.get('_TEST_DOTTEST')).toEqual('dottest');
    expect(pvEnv.service.get('_TEST_DOTENV_VS_ENVIRONMENT_VS_DOTTEST')).toEqual(
      'dottest',
    );
  });

  it('.env.development.local vs 環境変数 は 環境変数 が勝つ', async () => {
    expect(pvEnv.service.get('_TEST_DOTENV_VS_ENVIRONMENT_VARIABLES')).toEqual(
      'direnv',
    );
  });

  it('.env.development.local にだけ記載されているものはそれが手に入る', async () => {
    expect(pvEnv.service.get('_TEST_DOTENV_ONLY')).toEqual('dotenv');
  });
});
