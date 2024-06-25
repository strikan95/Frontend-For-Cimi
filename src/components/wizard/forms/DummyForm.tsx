import React from 'react';
import FormWrapper from '@/components/wizard/forms/FormWrapper';
import { WizardMachineContext } from '@/components/wizard/machine/WizardMachineContext';

function DummyForm({ step }: { step: string }) {
  const ref = WizardMachineContext.useActorRef();
  const state = WizardMachineContext.useSelector((s) => s);

  const draft = state.context.draft;

  return (
    <div
      className={'flex min-h-svh flex-col items-center justify-center pb-16'}
    >
      <FormWrapper
        onNext={() =>
          ref.send({ type: 'NEXT', draft: { ...draft, lastUpdatedStep: step } })
        }
        onBack={() => ref.send({ type: 'BACK' })}
        isLoading={false}
      >
        <h1>{step}</h1>
      </FormWrapper>
    </div>
  );
}

export default DummyForm;
