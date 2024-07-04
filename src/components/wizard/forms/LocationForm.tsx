'use client';
import React, { useState } from 'react';
import FormWrapper from '@/components/wizard/forms/FormWrapper';
import { WizardMachineContext } from '@/components/wizard/machine/WizardMachineContext';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { z } from 'zod';
import { Control, FieldPath, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Draft } from '@/lib/cimi/types/draftData.types';
import { updateDraft } from '@/lib/cimi/api/draft';
import { Transition } from '@headlessui/react';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import GeocoderMap from '@/components/map/GeocoderMap';
import { getAddress } from '@/lib/utils';

const formSchema = z.object({
  street: z.string().min(1).max(48),
  streetNumber: z.string().min(1).max(16),
  postCode: z.string().min(1).max(24),
  city: z.string().min(1).max(24),
  country: z.string().min(1).max(24),
  latitude: z.number(),
  longitude: z.number(),
});

function InputField({
  control,
  name,
  label,
  placeholder,
}: {
  control: Control<any>;
  name: FieldPath<any>;
  label: string;
  placeholder: string;
}) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input placeholder={placeholder} {...field} />
          </FormControl>
          <FormDescription></FormDescription>
        </FormItem>
      )}
    />
  );
}

function LocationForm() {
  const ref = WizardMachineContext.useActorRef();
  const state = WizardMachineContext.useSelector((s) => s);

  const hasOldData =
    state.context.draft?.location?.latitude != 0 &&
    state.context.draft?.location?.longitude != 0;

  const [selected, setSelected] = useState<boolean | MapboxGeocoder.Result>(
    hasOldData
  );
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      street: state.context.draft?.location?.street || '',
      streetNumber: state.context.draft?.location?.streetNumber || '',
      postCode: state.context.draft?.location?.postCode || '',
      city: state.context.draft?.location?.city || '',
      country: state.context.draft?.location?.country || '',
      latitude: state.context.draft?.location?.latitude || undefined,
      longitude: state.context.draft?.location?.longitude || undefined,
    },
  });

  async function handleSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    try {
      const res = await updateDraft(
        values as Partial<Draft>,
        state.context.draftId,
        'location'
      );

      if (res.error) {
        setIsLoading(false);
        return;
      }

      setIsLoading(false);
      ref.send({ type: 'NEXT', draft: res.result });
    } catch (e) {
      console.error(e);
    }
  }

  function handleSelection(e: MapboxGeocoder.Result) {
    setSelected(e);
    const address = getAddress(e);
    form.setValue('street', address.street);
    form.setValue('streetNumber', address.streetNumber);
    form.setValue('postCode', address.postCode);
    form.setValue('city', address.city);
    form.setValue('country', address.country);
    form.setValue('longitude', address.longitude);
    form.setValue('latitude', address.latitude);
  }

  return (
    <div
      className={
        'flex min-h-svh flex-col items-center justify-center lg:mx-auto lg:max-w-lg'
      }
    >
      <Form {...form}>
        <form
          className={'flex w-full flex-col px-8 lg:max-w-lg'}
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <FormWrapper
            onNext={() => {}}
            onBack={() => ref.send({ type: 'BACK' })}
            isLoading={isLoading}
          >
            <div className={'self-start pb-2'}>
              <h1 className={'font-bold'}>Where is your property located?</h1>
              <p>Use search to find the location of your property.</p>
            </div>
            {
              <Transition
                show={!!selected}
                enter="transition-opacity duration-400"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-150"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <InputField
                  control={form.control}
                  label={'Street Name'}
                  name={'street'}
                  placeholder={'Street name'}
                />
                <InputField
                  control={form.control}
                  label={'Street Number'}
                  name={'streetNumber'}
                  placeholder={'Street number'}
                />
                <InputField
                  control={form.control}
                  label={'Post Code'}
                  name={'postCode'}
                  placeholder={'Post code'}
                />
                <InputField
                  control={form.control}
                  label={'City'}
                  name={'city'}
                  placeholder={'City'}
                />
                <InputField
                  control={form.control}
                  label={'Country'}
                  name={'country'}
                  placeholder={'Country'}
                />
              </Transition>
            }
            <GeocoderMap
              onSelect={handleSelection}
              oldData={
                hasOldData
                  ? {
                      latitude: form.getValues('latitude'),
                      longitude: form.getValues('longitude'),
                    }
                  : undefined
              }
            />
          </FormWrapper>
        </form>
      </Form>
    </div>
  );
}

export default LocationForm;
