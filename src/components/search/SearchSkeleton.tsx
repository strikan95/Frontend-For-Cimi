import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

function SearchSkeleton() {
  return (
    <div>
      <div
        className={`flex w-full flex-col gap-8 pt-8 sm:grid sm:grid-cols-2 md:grid-cols-3 md:pt-16
          lg:grid-cols-5`}
      >
        {[...Array(20)].map((_, index) => (
          <div className="flex flex-col space-y-3">
            <Skeleton className="h-[125px] w-[250px] rounded-xl bg-white" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px] bg-white" />
              <Skeleton className="h-4 w-[200px] bg-white" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchSkeleton;
