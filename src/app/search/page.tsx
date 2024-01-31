'use client';

import React, { useEffect, useState } from 'react';
import MainSearchModal from '@/components/search/MainSearchModal';

function Page() {
  return (
    <div className={'bg-gray-100 p-6'}>
      <MainSearchModal />
    </div>
  );
}

export default Page;
