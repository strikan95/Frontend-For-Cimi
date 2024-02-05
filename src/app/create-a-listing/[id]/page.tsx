'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { FormStepProps } from '@/app/create-a-listing/components/Form1';
import { Button } from '@/components/ui/button';

const formSteps: React.ComponentType<FormStepProps>[] = ['Form1', 'Form2'].map(
  (step) => {
    return dynamic<FormStepProps>(() => import(`../components/${step}`), {
      loading: () => <p>Loading...</p>,
    });
  }
);

const useWizard = ({
  steps,
}: {
  steps: React.ComponentType<FormStepProps>[];
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const CurrentStepForm = formSteps[currentStepIndex];

  useEffect(() => {
    console.log(currentStepIndex);
  }, [currentStepIndex]);

  const previous = () => {
    if (currentStepIndex === 0) return;
    setCurrentStepIndex((prevState) => prevState - 1);
  };

  const next = () => {
    if (currentStepIndex >= formSteps.length - 1) return;
    setCurrentStepIndex((prevState) => prevState + 1);
  };

  return {
    previous,
    next,
    isLastStep: currentStepIndex === formSteps.length - 1,
    isFirstStep: currentStepIndex === 0,
    CurrentStepForm,
  };
};

function Page({ params }: { params: { id: string } }) {
  const { previous, next, isFirstStep, isLastStep, CurrentStepForm } =
    useWizard({ steps: formSteps });

  return (
    <div className="p-6">
      <CurrentStepForm onSubmit={next}>
        {!isFirstStep ? (
          <Button onClick={previous} type={'button'}>
            Previous
          </Button>
        ) : null}
        <Button type={'submit'}>{isLastStep ? 'Finish' : 'Next'}</Button>
      </CurrentStepForm>
    </div>
  );
}

export default Page;
