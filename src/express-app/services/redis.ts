import Redis, { Redis as RedisClient } from 'ioredis';
import logger from './logger'; // Assuming you have a logger utility

let redis: RedisClient | null = null;

/**
 * Initializes the Redis client if it hasn't been initialized yet.
 *
 * @returns {RedisClient} - The Redis client instance.
 */
export const initializeRedis = (
  host: string = '127.0.0.1',
  port: number = 6379,
  password?: string,
  db: number = 0,
): RedisClient => {
  if (!redis) {
    redis = new Redis({
      host,
      port,
      password,
      db,
    });
    logger.info('Redis client initialized');
  }
  return redis;
};

/**
 * Sets a value in Redis.
 *
 * @param {string} key - The key to set.
 * @param {string} value - The value to set.
 * @returns {Promise<void>} - A promise that resolves when the value is set.
 */
export const setValue = async (key: string, value: string): Promise<void> => {
  try {
    if (!redis) {
      throw new Error('Redis is not initialized.');
    }
    await redis.set(key, value);
    logger.info(`Set key ${key} with value ${value}`);
  } catch (error) {
    logger.error('Error setting value in Redis:', error);
    throw error;
  }
};

/**
 * Gets a value from Redis.
 *
 * @param {string} key - The key to get.
 * @returns {Promise<string | null>} - A promise that resolves to the value or null if the key does not exist.
 */
export const getValue = async (key: string): Promise<string | null> => {
  try {
    if (!redis) {
      throw new Error('Redis is not initialized.');
    }
    const value = await redis.get(key);
    logger.info(`Got value ${value} for key ${key}`);
    return value;
  } catch (error) {
    logger.error('Error getting value from Redis:', error);
    throw error;
  }
};

/**
 * Deletes a key from Redis.
 *
 * @param {string} key - The key to delete.
 * @returns {Promise<void>} - A promise that resolves when the key is deleted.
 */
export const deleteKey = async (key: string): Promise<void> => {
  try {
    if (!redis) {
      throw new Error('Redis is not initialized.');
    }
    await redis.del(key);
    logger.info(`Deleted key ${key}`);
  } catch (error) {
    logger.error('Error deleting key from Redis:', error);
    throw error;
  }
};

/**
 * Closes the Redis connection.
 *
 * @returns {Promise<void>} - A promise that resolves when the connection is closed.
 */
export const closeRedisConnection = async (): Promise<void> => {
  if (redis) {
    await redis.quit();
    redis = null;
    logger.info('Redis connection closed');
  }
};
