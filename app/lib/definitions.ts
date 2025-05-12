// /app/lib/definitions.ts

// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};

export type Invoice = {
  id: string;
  customer_id: string;
  amount: number; // Store the amount as a number for easy calculation
  date: string;   // Store date as a string (ISO format: 'YYYY-MM-DD')
  status: 'pending' | 'paid';  // Status of the invoice
};

export type Revenue = {
  month: string;  // Store month in 'YYYY-MM' format (e.g., '2025-05')
  revenue: number;  // Revenue amount for the month
};

// This represents the structure for Latest Invoices used in UI.
export type LatestInvoice = {
  id: string;
  name: string;
  image_url: string;
  email: string;
  amount: string;  // Amount formatted as a string for display purposes
};

// Raw data for LatestInvoice before it is formatted.
export type LatestInvoiceRaw = Omit<LatestInvoice, 'amount'> & {
  amount: number;  // Amount is stored as a number in the database
};

// Full Invoice structure for interacting with database.
export type InvoicesTable = {
  id: string;
  customer_id: string;
  name: string;
  email: string;
  image_url: string;
  date: string;
  amount: number;
  status: 'pending' | 'paid';
};

// Customer table type with additional aggregated information (like total invoices, pending, and paid).
export type CustomersTableType = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: number;
  total_paid: number;
};

// A formatted version of CustomersTableType to display in a user-friendly format.
export type FormattedCustomersTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: string;  // Formatted as string (currency)
  total_paid: string;     // Formatted as string (currency)
};

export type CustomerField = {
  id: string;
  name: string;
};

export type InvoiceForm = {
  id: string;
  customer_id: string;
  amount: number;
  status: 'pending' | 'paid';
};

