// /pages/api/fetchInvoices.ts (API Route)
import { NextApiRequest, NextApiResponse } from 'next';
import postgres from 'postgres';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const sql = postgres(); // Initialize PostgreSQL client
  try {
    const data = await sql`SELECT * FROM invoices`; // Query the database
    res.status(200).json(data); // Return the result as JSON
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch invoices' }); // Handle any errors
  }
}
