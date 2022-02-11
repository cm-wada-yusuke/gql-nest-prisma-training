import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PbEnvModule } from '@pb-config/environments/pb-env.module';
import { PbEnv } from '@pb-config/environments/pb-env.service';
import { ProfileResolver } from './profile.resolver';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [PbEnvModule],
      useFactory: async (env: PbEnv) => env.MicroCmsHttpModuleOptionsFactory,
      inject: [PbEnv],
    }),
  ],
  providers: [ProfileResolver],
})
export class ProfileModule {}
