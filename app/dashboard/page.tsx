// /app/dashboard/page.tsx
import { Card } from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { lusitana } from '@/app/ui/fonts';
import { fetchRevenue, fetchLatestInvoices, fetchCardData } from '@/app/lib/data';

export default async function Page() {
  // Fetch all data in parallel using Promise.all
  const [revenue, latestInvoices, cardData] = await Promise.all([
    fetchRevenue(),
    fetchLatestInvoices(),
    fetchCardData(),
  ]);

  const { numberOfInvoices, numberOfCustomers, totalPaidInvoices, totalPendingInvoices } = cardData;

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* Pass the fetched data to the Card components */}
        <Card
          title="Collected"
          value={totalPaidInvoices}
          type="collected"
        />
        <Card
          title="Pending"
          value={totalPendingInvoices}
          type="pending"
        />
        <Card
          title="Total Invoices"
          value={numberOfInvoices}
          type="invoices"
        />
        <Card
          title="Total Customers"
          value={numberOfCustomers}
          type="customers"
        />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        {/* Pass the fetched revenue data to the RevenueChart component */}
        <RevenueChart revenue={revenue} />
        
        {/* Pass the fetched latest invoices to the LatestInvoices component */}
        <LatestInvoices latestInvoices={latestInvoices} />
      </div>
    </main>
  );
}
