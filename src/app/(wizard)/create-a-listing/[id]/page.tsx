'use client';
import React, { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { WizardMachineContext } from '@/components/wizard/machine/WizardMachineContext';

function Page({ params }: { params: { id: string } }) {
  const state = WizardMachineContext.useSelector((s) => s);

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!state?.matches('loadingDraft') && !state.matches('loaded')) {
      router.push(`${pathname}/${state.value}`);
    }
  }, [state]);

  return <div>{params.id}</div>;
}

export default Page;
