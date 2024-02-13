import React from 'react';
import { ParentMachineContextProvider } from '@/app/(wizard)/create-a-listing/machine/WizardMachineContext';

export default function Layout({
  params,
  children,
}: Readonly<{ children: React.ReactNode; params: { id: string } }>) {
  return (
    <ParentMachineContextProvider draftId={params.id}>
      <div className="h-[calc(100vh-8rem)] py-10">
        <main className={'flex h-full flex-col items-center justify-center'}>
          <div className="max-w-7xl sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>
    </ParentMachineContextProvider>
  );
}
