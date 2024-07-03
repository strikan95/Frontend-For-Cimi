'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import React, { useEffect, useState } from 'react';
import * as Checkbox from '@radix-ui/react-checkbox';
import { WizardMachineContext } from '@/components/wizard/machine/WizardMachineContext';
import FormWrapper from '@/components/wizard/forms/FormWrapper';
import { Check } from 'lucide-react';
import { Amenity } from '@/lib/cimi/types/listingData.types';
import { getAmenities, updateDraft } from '@/lib/cimi/api/draft';

const formSchema = z.object({
  amenities: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: 'You have to select at least one amenity.',
  }),
});

function StructureTypeForm() {
  const [options, setOptions] = useState<Amenity[]>([]);
  const ref = WizardMachineContext.useActorRef();
  const state = WizardMachineContext.useSelector((s) => s);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const updateOptions = async () => {
      try {
        const options = await getAmenities();
        if (options.result) {
          setOptions(options.result);
        }
      } catch (e) {
        console.error(e);
      }
    };

    updateOptions();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // @ts-ignore
      amenities:
        state.context.draft?.amenities.reduce((acc: string[], val) => {
          return [...acc, val.name];
        }, []) || [],
    },
  });

  async function handleSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    try {
      const res = await updateDraft(values, state.context.draftId, 'amenities');

      if (res.error) {
        //bla bla resolve backend errors
        form.setError('amenities', { message: 'server error/' });
        setIsLoading(false);
        return;
      }

      setIsLoading(false);
      ref.send({ type: 'NEXT', draft: res.result });
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div
      className={'flex min-h-svh flex-col items-center justify-center pb-16'}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <FormWrapper
            onNext={() => {}}
            onBack={() => ref.send({ type: 'BACK' })}
            isLoading={isLoading}
          >
            <FormField
              name={'amenities'}
              control={form.control}
              render={() => (
                <FormItem>
                  <div className="my-4">
                    <FormLabel className="text-base">
                      Select multiple amenities that your property provides.
                    </FormLabel>
                    <FormDescription>
                      You need to select at least 3 amenities.
                    </FormDescription>
                  </div>
                  <div
                    className={'grid grid-cols-2 justify-items-center gap-2'}
                  >
                    {options.map((option) => (
                      <FormField
                        key={option.id}
                        name={'amenities'}
                        control={form.control}
                        render={({ field }) => {
                          return (
                            <FormItem className={'col-span-1'} key={option.id}>
                              <Checkbox.Root
                                asChild
                                checked={field.value?.includes(option.name)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([
                                        ...field.value,
                                        option.name,
                                      ])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== option.name
                                        )
                                      );
                                }}
                                className={`relative flex h-24 w-32 flex-col items-center justify-center rounded-lg border-2`}
                              >
                                <div>
                                  <Checkbox.Indicator
                                    className={
                                      'absolute right-2 top-2 rounded-full bg-blue-300 p-1'
                                    }
                                  >
                                    <Check className={'h-4 w-4'} />
                                  </Checkbox.Indicator>
                                  <FormLabel className="pb-2 text-center text-sm font-normal">
                                    {option.name}
                                  </FormLabel>
                                  <img
                                    className={'h-6 w-6'}
                                    src={option.iconUrl}
                                  />
                                </div>
                              </Checkbox.Root>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage className={'absolute'} />
                </FormItem>
              )}
            />
          </FormWrapper>
        </form>
      </Form>
    </div>
  );
}

export default StructureTypeForm;
