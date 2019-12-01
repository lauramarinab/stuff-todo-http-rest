import { Client } from "pg";

const createClient = async () => {
  const client = new Client({
    user: "pguser",
    host: "localhost",
    database: "todo",
    password: "pguser",
    port: 1234
  });

  await client.connect();

  return client;
};
