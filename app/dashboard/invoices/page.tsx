// import Pagination from '@/app/ui/invoices/pagination';
// import Search from '@/app/ui/search';
// import Table from '@/app/ui/invoices/table';
// import { CreateInvoice } from '@/app/ui/invoices/buttons';
// import { lusitana } from '@/app/ui/fonts';
// import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
// import { Suspense } from 'react';

// export default async function Page({
//   searchParams,
// }: {
//   searchParams?: {
//     query?: string;
//     page?: string;
//   };
// }) {
//   // Await searchParams to prevent sync error
//   const query = searchParams?.query || '';
//   const currentPage = Number(searchParams?.page) || 1;

//   return (
//     <div className="w-full">
//       <div className="flex w-full items-center justify-between">
//         <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1>
//       </div>
//       <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
//         <Search placeholder="Search invoices..." />
//         <CreateInvoice />
//       </div>
//       <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
//         <Table query={query} currentPage={currentPage} />
//       </Suspense>
//       <div className="mt-5 flex w-full justify-center">
//         {/* <Pagination totalPages={totalPages} /> */}
//       </div>
//     </div>
//   );
// }

import { Suspense } from 'react';
import { lusitana } from '@/app/ui/fonts';
import { CreateInvoice } from '@/app/ui/invoices/buttons';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import Table from '@/app/ui/invoices/table';
import Search from '@/app/ui/search';
import { fetchInvoicesPages } from '@/app/lib/data'; // Import the fetch function
import Pagination from '@/app/ui/invoices/pagination'; // Import Pagination component

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || ''; // Get search query
  const currentPage = Number(searchParams?.page || 1); // Default page is 1

  // Fetch the total number of pages based on the query
  const totalPages = await fetchInvoicesPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search invoices..." />
        <CreateInvoice />
      </div>
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        {/* Pagination component */}
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      </div>
    </div>
  );
}
