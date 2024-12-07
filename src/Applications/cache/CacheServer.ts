abstract class CacheServer {
  abstract set(key: string, value: string): Promise<void>;
  abstract get(key: string): Promise<string>;
  abstract delete(key:string): Promise<unknown>;
};

export default CacheServer;
