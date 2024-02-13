'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { WizardMachineContext } from '@/app/(wizard)/create-a-listing/machine/WizardMachineContext';
import DescriptionForm from '@/app/(wizard)/create-a-listing/components/DescriptionForm';
import TitleForm from '@/app/(wizard)/create-a-listing/components/TitleForm';
import StructureTypeForm from '@/app/(wizard)/create-a-listing/components/StructureTypeForm';

function Page({ params }: { params: { id: string; step: string } }) {
  const state = WizardMachineContext.useSelector((s) => s);
  const router = useRouter();

  useEffect(() => {
    switch (true) {
      case state.matches('title'):
        router.push(`/create-a-listing/${params.id}/title`, {});
        break;
      case state.matches('description'):
        router.push(`/create-a-listing/${params.id}/description`);
        break;
      case state.matches('structureType'):
        router.push(`/create-a-listing/${params.id}/structure-type`);
        break;
      case state.matches('location'):
        router.push(`/create-a-listing/${params.id}/location`);
        break;
      default:
        break;
    }
  }, [state]);

  return (
    <div>
      {params.step === 'title' && state.matches('title') && <TitleForm />}
      {params.step === 'description' && state.matches('description') && (
        <DescriptionForm />
      )}
      {params.step === 'structure-type' && state.matches('structureType') && (
        <StructureTypeForm />
      )}
    </div>
  );
}

export default Page;
