'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';

function Page() {
  const params = useSearchParams();

  const debugRenderParams = () => {
    const items = [];

    for (const [key, value] of params) {
      items.push(
        <div key={key} className={'flex text-lg'}>
          <h1 className={'font-bold'}>{key}: </h1>
          <span>{value}</span>
        </div>
      );
    }

    return items;
  };

  return (
    <div className={'flex flex-col items-center p-2'}>
      {...debugRenderParams()}
    </div>
  );
}

export default Page;
