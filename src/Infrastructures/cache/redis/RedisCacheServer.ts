import { createClient, RedisClientType } from 'redis';
import CacheServer from '@applications/cache/CacheServer';



class RedisCacheServer implements CacheServer{
  private client: RedisClientType;
  constructor() {
    this.client = createClient({
      socket: {
        host: process.env.REDIS_HOST,
      }
    });

    this.client.on('error', (error) => console.error(error));
    this.client.connect();
  }

  public async set(key: string, value: string, expirationInSecond = 1800) : Promise<void> {
    await this.client.set(key, value, {
      EX: expirationInSecond,
    });
  }

  public async get(key: string): Promise<string> {
    const result = await this.client.get(key);
    if (!result) throw new Error('Cache tidak ditemukan');
    return result;
  }

  public async delete(key: string): Promise<number> {
    return this.client.del(key);
  }
};

export default RedisCacheServer;
