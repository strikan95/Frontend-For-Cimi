import React, { Suspense } from 'react';

function Page() {
  return (
    <div
      className={
        'flex min-h-svh flex-col items-center justify-center pb-16 pt-16'
      }
    >
      <Suspense fallback={<div>...Loading</div>}></Suspense>
    </div>
  );
}

export default Page;
