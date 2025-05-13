// /app/ui/dashboard/revenue-chart.tsx
import { lusitana } from '@/app/ui/fonts';  // Import custom font
import { Revenue } from '@/app/lib/definitions';  // Import the Revenue type
import { fetchRevenue } from '@/app/lib/data';  // Import the fetch function to get revenue data

// The RevenueChart component that now fetches its own data
export default async function RevenueChart() {
  // Fetch the revenue data inside the component
  const revenue = await fetchRevenue();

  // If no revenue data is found, show a fallback message
  if (!revenue || revenue.length === 0) {
    return <p className="mt-4 text-gray-400">No data available.</p>;
  }

  const chartHeight = 350;  // Height of the chart's bars
  const maxRevenue = Math.max(...revenue.map((r) => r.revenue));  // Get the max revenue value for scaling

  return (
    <div className="w-full md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Recent Revenue
      </h2>
      <div className="rounded-xl bg-gray-50 p-4">
        <div className="grid grid-cols-12 items-end gap-2 bg-white p-4 rounded-md">
          {revenue.map((month) => (
            <div key={month.month} className="flex flex-col items-center gap-2">
              <div
                className="w-full rounded-md bg-blue-300"
                style={{
                  height: `${(month.revenue / maxRevenue) * chartHeight}px`,  // Dynamically adjust height based on revenue
                }}
              />
              <p className="-rotate-90 text-sm text-gray-400 sm:rotate-0">
                {month.month}  {/* Display the month name */}
              </p>
            </div>
          ))}
        </div>
        <p className="pt-6 text-sm text-gray-500">Last 12 months</p>
      </div>
    </div>
  );
}
