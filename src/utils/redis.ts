// filepath: /Users/Shared/CODING-SHARED/shared-library/src/utils/redis.ts
import Redis from 'ioredis';
import { Redis as RedisType } from 'ioredis';
import { RedisConfig } from '../types';

/**
 * Creates a Redis client.
 * @param {RedisConfig} config - Configuration for the Redis connection.
 * @returns {RedisType} Redis client instance.
 */
export const createRedisClient = (config: RedisConfig): RedisType => {
  return new Redis(config);
};