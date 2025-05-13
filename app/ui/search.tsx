'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function Search({ placeholder }: { placeholder: string }) {
  // Get the current search params and pathname
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // Create a debounced version of the handleSearch function
  const handleSearch = useDebouncedCallback((term: string) => {
    console.log(`Searching... ${term}`); // For debugging

    // Get the current search params from the URL
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('query', term); // Set the search query if term exists
    } else {
      params.delete('query'); // Remove the query param if the term is empty
    }

    // Replace the URL with the new query param without reloading the page
    replace(`${pathname}?${params.toString()}`);
  }, 300); // Debounce by 300ms

  // Extract the 'query' param value from the URL searchParams safely
  const initialQueryValue = searchParams ? searchParams.get('query') || '' : '';

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        id="search" // Adding an ID for accessibility
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => handleSearch(e.target.value)} // Call the debounced function
        defaultValue={initialQueryValue} // Sync input with URL search params
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
