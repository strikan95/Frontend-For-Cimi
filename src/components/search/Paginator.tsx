'use client';

import React, { useEffect } from 'react';
import { useFilter } from '@/lib/filter/useFilter';
import { Button } from '@/components/ui/button';
import { cn, delay } from '@/lib/utils';

type Props = {
  pages: number;
};

function Paginator({ pages }: Props) {
  const { data, updateParams, handleSearch } = useFilter();
  const isLastPage = data.page >= pages;
  const isFirstPage = data.page <= 1;

  function handleNextPage() {
    const pageNumber = isLastPage ? pages : data.page + 1;
    updateParams({ page: pageNumber });
  }

  function handlePrevPage() {
    const pageNumber = isFirstPage ? 1 : data.page - 1;
    updateParams({ page: pageNumber });
  }

  return (
    <div className={'flex w-full justify-center gap-1 pt-6'}>
      <Button
        className={cn(
          `m-0 aspect-square h-16 w-16 rounded-full bg-transparent p-1 text-xl text-black
            hover:bg-blue-300`
        )}
        disabled={isFirstPage}
        onClick={handlePrevPage}
      >
        {'<'}
      </Button>
      <Button
        className={cn(
          `m-0 aspect-square h-16 w-16 rounded-full bg-transparent p-1 text-xl text-black
            hover:bg-blue-300`
        )}
        disabled={isLastPage}
        onClick={handleNextPage}
      >
        {'>'}
      </Button>
    </div>
  );
}

export default Paginator;
