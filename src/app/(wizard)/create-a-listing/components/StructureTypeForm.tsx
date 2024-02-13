'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import React, { useEffect, useState } from 'react';
import * as RadioGroup from '@radix-ui/react-radio-group';
import { Draft, StructureType } from '@/types/draftData.types';
import {
  getStructureTypes,
  updateDraft,
} from '@/app/(wizard)/create-a-listing/actions';
import { WizardMachineContext } from '@/app/(wizard)/create-a-listing/machine/WizardMachineContext';
import FormWrapper from '@/app/(wizard)/create-a-listing/components/FormWrapper';

function StructureTypeForm() {
  const [options, setOptions] = useState<StructureType[]>([]);
  const ref = WizardMachineContext.useActorRef();
  const state = WizardMachineContext.useSelector((s) => s);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const updateOptions = async () => {
      try {
        const options = await getStructureTypes();
        if (options.result) {
          setOptions(options.result);
        }
      } catch (e) {
        console.error(e);
      }
    };

    updateOptions();
  }, []);

  const opts = options.reduce<[string]>(
    (acc, opt) => {
      acc.push(opt.name);
      return acc;
    },
    ['']
  );

  const formSchema = z.object({
    type: z.enum(opts, {
      required_error: 'You need to select a notification type.',
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function handleSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    try {
      const res = await updateDraft(
        values as Partial<Draft>,
        '1',
        'structure_type'
      );

      if (res.error) {
        //bla bla resolve backend errors
        form.setError('type', { message: 'description is wrong' });
        setIsLoading(false);
        return;
      }
    } catch (e) {
      console.error(e);
    }

    setIsLoading(false);
    ref.send({ type: 'NEXT' });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormWrapper
          onNext={() => {}}
          onBack={() => ref.send({ type: 'BACK' })}
          isLoading={isLoading}
        >
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="flex flex-col items-center justify-center">
                <FormLabel className={`pb-8 text-lg font-bold`}>
                  Which of these best describes the type of your property?{' '}
                </FormLabel>
                <FormControl>
                  <RadioGroup.Root
                    className="flex w-fit flex-col gap-2.5"
                    onValueChange={field.onChange}
                    defaultValue="default"
                    aria-label="View density"
                  >
                    {options.length <= 0 ? (
                      <>Loading types....</>
                    ) : (
                      <div
                        className={`flex flex-wrap items-center justify-center gap-4`}
                      >
                        {options.map((option, index) => {
                          return (
                            <div key={index} className="flex items-center">
                              <RadioGroup.Item
                                className="hover:bg-violet3 flex h-24 w-32 cursor-default flex-col items-center
                                  justify-center rounded-lg border-2 bg-white outline-none focus:border-blue-500
                                  lg:h-32 lg:w-48"
                                value={option.name}
                                id={option.id.toString()}
                              >
                                <RadioGroup.Indicator />
                                <img
                                  width={'h-10'}
                                  height={'h-10'}
                                  src={option.iconUrl}
                                  alt={`${option.name}-icon`}
                                />
                                <label
                                  className="text-[15px] leading-none"
                                  htmlFor={option.id.toString()}
                                >
                                  {option.name}
                                </label>
                              </RadioGroup.Item>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </RadioGroup.Root>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </FormWrapper>
      </form>
    </Form>
  );
}

export default StructureTypeForm;
