import React from 'react';
import { ParentMachineContextProvider } from '@/components/wizard/machine/WizardMachineContext';

export default function Layout({
  params,
  children,
}: Readonly<{ children: React.ReactNode; params: { id: string } }>) {
  return (
    <ParentMachineContextProvider draftId={params.id}>
      <div className={'px-4'}>{children}</div>
    </ParentMachineContextProvider>
  );
}
