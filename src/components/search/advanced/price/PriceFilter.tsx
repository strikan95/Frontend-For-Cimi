'use client';

import { useFilter } from '@/lib/filter/useFilter';
import { Input } from '@/components/ui/input';
import React, { FormEvent } from 'react';

function PriceFilter() {
  const { data, updateParams } = useFilter();

  function handleInputChange(e: FormEvent<HTMLInputElement>) {
    const key = e.currentTarget.id;
    if (e.currentTarget.id === 'min') {
      updateParams({ priceMin: e.currentTarget.value || undefined });
    } else {
      updateParams({ priceMax: e.currentTarget.value || undefined });
    }
  }

  return (
    <div>
      <div className={'flex gap-2'}>
        <h1 className={`w-full pb-2 text-xl font-bold`}>Filter by Price</h1>
        {(data.priceMin || data.priceMax) && (
          <button
            onClick={() => {
              updateParams({ priceMin: undefined, priceMax: undefined });
            }}
            className={'text-gray-500 underline'}
          >
            Clear
          </button>
        )}
      </div>
      <div className={'flex w-full justify-between gap-2'}>
        <Input
          className={'w-1/2'}
          id={'min'}
          type={'number'}
          placeholder={'Price min'}
          onChange={handleInputChange}
          value={data.priceMin || ''}
        />
        <div className={'flex items-center'}>-</div>
        <Input
          className={'w-1/2'}
          id={'max'}
          type={'number'}
          placeholder={'Price max'}
          onChange={handleInputChange}
          value={data.priceMax || ''}
        />
      </div>
    </div>
  );
}

export default PriceFilter;
