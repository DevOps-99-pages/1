import { MongoClient } from "mongodb";

const { MONGO_URI } = process.env;

const client = new MongoClient(MONGO_URI || "mongo://localhost:27017");

(async () => {
  await client.connect();
})();

export default client;
