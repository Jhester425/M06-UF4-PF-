// /app/dashboard/(overview)/page.tsx
import { Suspense } from 'react';
import { lusitana } from '@/app/ui/fonts';
import { RevenueChartSkeleton, LatestInvoicesSkeleton } from '@/app/ui/skeletons';
import CardWrapper from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { fetchLatestInvoices } from '@/app/lib/data';
import { CardsSkeleton } from '@/app/ui/skeletons';  // Import CardsSkeleton for fallback

export default async function Page() {
  const latestInvoices = await fetchLatestInvoices();  // Fetch latest invoices

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper /> {/* This will render the 4 cards */}
        </Suspense>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart />
        </Suspense>
        <Suspense fallback={<LatestInvoicesSkeleton />}>
          <LatestInvoices latestInvoices={latestInvoices} /> {/* Passing prop now */}
        </Suspense>
      </div>
    </main>
  );
}
