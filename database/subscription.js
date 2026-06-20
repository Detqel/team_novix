import client from "./connection.js";

export const getSubscriptions = async () => {
  const result = await client.query("SELECT * FROM subscriptions");
  return result.rows;
};