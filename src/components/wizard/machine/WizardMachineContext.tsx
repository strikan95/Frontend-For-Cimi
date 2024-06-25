'use client';
import { createActorContext } from '@xstate/react';
import { WizardMachine } from '@/components/wizard/machine/wizardMachine';
import React from 'react';

export const WizardMachineContext = createActorContext(WizardMachine);

export function ParentMachineContextProvider({
  draftId,
  children,
}: {
  draftId: string;
  children: React.ReactNode;
}) {
  return (
    <WizardMachineContext.Provider options={{ input: { id: draftId } }}>
      {children}
    </WizardMachineContext.Provider>
  );
}
