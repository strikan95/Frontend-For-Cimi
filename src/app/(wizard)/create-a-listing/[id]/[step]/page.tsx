'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { WizardMachineContext } from '@/components/wizard/machine/WizardMachineContext';
import DescriptionForm from '@/components/wizard/forms/DescriptionForm';
import TitleForm from '@/components/wizard/forms/TitleForm';
import StructureTypeForm from '@/components/wizard/forms/StructureTypeForm';
import LocationForm from '@/components/wizard/forms/LocationForm';
import ImagesForm from '@/components/wizard/forms/ImagesForm';
import AmenitiesForm from '@/components/wizard/forms/AmenitiesForm';
import PriceForm from '@/components/wizard/forms/PriceForm';
import { updateDraft } from '@/lib/cimi/api/draft';

const Forms: Record<string, React.ReactNode> = {
  'structure-type': <StructureTypeForm />,
  amenities: <AmenitiesForm />,
  location: <LocationForm />,
  images: <ImagesForm />,
  title: <TitleForm />,
  description: <DescriptionForm />,
  pricing: <PriceForm />,
};
function Page({ params }: { params: { id: string; step: string } }) {
  const state = WizardMachineContext.useSelector((s) => s);
  const router = useRouter();

  useEffect(() => {
    if (!state?.matches('loadingDraft') && !state.matches('loaded')) {
      router.push(`/create-a-listing/${params.id}/${state.value}`);
    }
  }, [state, params.id, router]);

  useEffect(() => {
    const finalise = async () => {
      const products = await updateDraft(
        undefined,
        state.context.draftId,
        'finalise'
      );

      router.push(`/listing/${params.id}`);
    };

    if (state.matches('finalise')) {
      finalise();
    }
  }, [state]);

  return <div>{params.step === state.value && Forms[state.value]}</div>;
}

export default Page;
