import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER, Inject } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { firstValueFrom } from 'rxjs';
import { ProfileModel } from './interfaces/profile.model';
import { Cache } from 'cache-manager';

const CacheKey = 'profile';

@Resolver((of) => ProfileModel)
export class ProfileResolver {
  constructor(
    private microCmsApi: HttpService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Query(() => ProfileModel, { name: 'profile', nullable: true })
  async getProfile() {
    // キャッシュにあればそれを、なければ microCMSから返す
    const cached = await this.cacheManager.get(CacheKey);
    if (cached) {
      return cached;
    }
    const data = (await firstValueFrom(this.microCmsApi.get('profile'))).data;
    await this.cacheManager.set(CacheKey, data, { ttl: 5 * 60 });
    console.log('cached!', data);
    return data;
  }
}
