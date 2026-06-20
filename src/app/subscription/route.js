import client from "@/database/connection";

export async function GET() {
  try {
    await client.connect();

    const result = await client.query("SELECT * FROM subscriptions");

    return Response.json(result.rows);
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}