'use client';

import React from 'react';
import { useFilter } from '@/lib/filter/useFilter';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type Props = {
  pages: number;
};

function Paginator({ pages }: Props) {
  const { data, updateParams, handleSearch, page: currentPage } = useFilter();

  function handlePageChange(page: number) {
    handleSearch(page);
  }

  const isFirstPage = 1 === currentPage;
  const isLastPage = pages === currentPage;

  return (
    <div className={'flex w-full justify-center gap-1'}>
      <Button
        className={cn(
          'm-0 aspect-square rounded-full bg-transparent p-1 text-black hover:bg-blue-300'
        )}
        disabled={isFirstPage}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        {!isFirstPage && '<'}
      </Button>
      {[...Array(Math.min(pages - currentPage + 1, 5))].map((e, i) => {
        const pageNumber = currentPage + i;
        const isCurrentPage = pageNumber === currentPage;
        return (
          <Button
            className={cn(
              'm-0 aspect-square rounded-full p-1 disabled:bg-blue-500 disabled:opacity-100',
              isCurrentPage
                ? 'text-white, bg-blue-700'
                : 'bg-transparent text-black'
            )}
            disabled={isCurrentPage}
            key={i}
            onClick={() => handlePageChange(pageNumber)}
          >
            {pageNumber}
          </Button>
        );
      })}
      <Button
        className={cn(
          'm-0 aspect-square rounded-full bg-transparent p-1 text-black hover:bg-blue-300'
        )}
        disabled={isLastPage}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        {!isLastPage && '>'}
      </Button>
    </div>
  );
}

export default Paginator;
