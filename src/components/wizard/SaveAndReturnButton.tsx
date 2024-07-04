'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

function SaveAndReturnButton() {
  const router = useRouter();

  function handleClick() {
    router.push('/hosting/listings');
  }

  return (
    <Button type={'button'} onClick={handleClick}>
      Save and return
    </Button>
  );
}

export default SaveAndReturnButton;
