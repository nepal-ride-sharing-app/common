// filepath: /Users/Shared/CODING-SHARED/shared-library/src/utils/redis.ts
import Redis from 'ioredis';
import { Redis as RedisType } from 'ioredis';
import { RedisConfig } from '../types';
export const createRedisClient = (config: RedisConfig): RedisType => {
  return new Redis(config);
};
