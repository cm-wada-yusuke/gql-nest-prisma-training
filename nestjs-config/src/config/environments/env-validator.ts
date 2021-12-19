import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';
// import * as dotenv from 'dotenv';
// import * as path from 'path';

enum NodeEnvEnum {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

/**
 * バリデーションしたい環境変数がある場合はここに記載してください。
 * バリデーションに失敗するとアプリケーションは起動しません。
 */
export class EnvValidator {
  @IsEnum(NodeEnvEnum)
  NODE_ENV: NodeEnvEnum;

  @IsNumber()
  PORT = 3333;

  @IsNotEmpty()
  @IsString()
  DATABASE_URL: string;

  _TEST_DOTENV_VS_ENVIRONMENT_VS_DOTTEST: string;
  _TEST_DOTENV_VS_ENVIRONMENT_VARIABLES: string;
  _TEST_DOTENV_ONLY: string;
}

/**
 * @param config 実行環境の環境変数。これが優先されます。
 * @returns
 */
export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(EnvValidator, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
