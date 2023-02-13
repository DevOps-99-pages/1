import redis from "redis";

const cacheClient = redis.createClient();

(async () => {
  await cacheClient.connect();
})();

export default cacheClient;
