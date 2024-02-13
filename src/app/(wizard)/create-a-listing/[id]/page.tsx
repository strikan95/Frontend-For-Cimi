'use client';
import React, { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { WizardMachineContext } from '@/app/(wizard)/create-a-listing/machine/WizardMachineContext';

function Page({ params }: { params: { id: string } }) {
  const state = WizardMachineContext.useSelector((s) => s);

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    switch (true) {
      case state?.matches('title'):
        router.push(`${pathname}/title`);
        break;
      case state?.matches('description'):
        router.push(`${pathname}/description`);
        break;
      case state?.matches('location'):
        router.push(`${pathname}/location`);
        break;
      default:
        break;
    }
  }, [state]);

  return <div>{params.id}</div>;
}

export default Page;
