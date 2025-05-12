import { BanknotesIcon, ClockIcon, UserGroupIcon, InboxIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';

// Icon mapping based on the type of card
const iconMap = {
  collected: BanknotesIcon,
  customers: UserGroupIcon,
  pending: ClockIcon,
  invoices: InboxIcon,
};

// Card Component to display the actual card data
export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: 'invoices' | 'customers' | 'pending' | 'collected';
}) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p
        className={`${lusitana.className} truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
      >
        {value}
      </p>
    </div>
  );
}

// CardWrapper to pass data down to Card component
export function CardWrapper({
  totalPaidInvoices,
  totalPendingInvoices,
  numberOfInvoices,
  numberOfCustomers,
}: {
  totalPaidInvoices: string;
  totalPendingInvoices: string;
  numberOfInvoices: number;
  numberOfCustomers: number;
}) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {/* Pass the relevant data to the Card components */}
      <Card title="Collected" value={totalPaidInvoices} type="collected" />
      <Card title="Pending" value={totalPendingInvoices} type="pending" />
      <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
      <Card title="Total Customers" value={numberOfCustomers} type="customers" />
    </div>
  );
}
