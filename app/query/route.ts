import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function listInvoices() {
  const data = await sql`
    SELECT invoices.amount, customers.name
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE invoices.amount = 666;
  `;
  return data;
}

export async function GET() {
  try {
    // Uncommented the part to execute the SQL query and return the result
    return Response.json(await listInvoices());
  } catch (error) {
    return Response.json({ error: 'Query failed' }, { status: 500 });
  }
}
