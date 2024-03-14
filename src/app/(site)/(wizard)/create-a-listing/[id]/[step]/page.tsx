'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { WizardMachineContext } from '@/components/wizard/machine/WizardMachineContext';
import DescriptionForm from '@/components/wizard/forms/DescriptionForm';
import TitleForm from '@/components/wizard/forms/TitleForm';
import StructureTypeForm from '@/components/wizard/forms/StructureTypeForm';
import LocationForm from '@/components/wizard/forms/LocationForm';
import ImagesForm from '@/components/wizard/forms/ImagesForm';
import DummyForm from '@/components/wizard/forms/DummyForm';
import AmenitiesForm from '@/components/wizard/forms/AmenitiesForm';

const Forms: Record<string, React.ReactNode> = {
  'structure-type': <StructureTypeForm />,
  'place-type': <DummyForm step={'place-type'} />,
  amenities: <AmenitiesForm />,
  location: <LocationForm />,
  images: <ImagesForm />,
  title: <TitleForm />,
  description: <DescriptionForm />,
  pricing: <DummyForm step={'pricing'} />,
};
function Page({ params }: { params: { id: string; step: string } }) {
  const state = WizardMachineContext.useSelector((s) => s);
  const router = useRouter();

  useEffect(() => {
    if (!state?.matches('loadingDraft') && !state.matches('loaded')) {
      router.push(`/create-a-listing/${params.id}/${state.value}`);
    }
  }, [state, params.id, router]);

  return <div>{params.step === state.value && Forms[state.value]}</div>;
}

export default Page;
