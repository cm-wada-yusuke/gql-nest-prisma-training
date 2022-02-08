import { plainToClass } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsString,
  IsUrl,
  validateSync,
} from 'class-validator';
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

  @IsNumberString()
  PORT = 3000;

  @IsNotEmpty()
  @IsString()
  DATABASE_URL: string;

  // @IsNotEmpty()
  // @IsString()
  // CONTENTS_BUCKET_NAME: string;

  // @IsNotEmpty()
  // @IsString()
  // GCP_PROJECT_ID: string;

  // @IsNotEmpty()
  // @IsUrl()
  // MICROCMS_ENDPOINT: string;

  // @IsNotEmpty()
  // @IsString()
  // MICROCMS_KEY: string;
}

/**
 * @param config 実行環境の環境変数。これが優先されます。
 * @returns
 */
export function validate(config: Record<string, unknown>) {
  console.log(config);
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
