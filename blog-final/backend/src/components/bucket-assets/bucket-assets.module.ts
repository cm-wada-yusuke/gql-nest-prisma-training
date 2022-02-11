import { Module } from '@nestjs/common';
import { GoogleStorageRepository } from './repositories/google-storage.repository';

@Module({
  imports: [],
  providers: [GoogleStorageRepository],
  exports: [GoogleStorageRepository],
})
export class BucketAssetsModule {}
