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
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Draft } from '@/lib/cimi/types/draftData.types';
import { updateDraft } from '@/lib/cimi/api/draft';

const formSchema = z.object({
  price: z.coerce.number(),
});

function PriceForm() {
  const ref = WizardMachineContext.useActorRef();
  const state = WizardMachineContext.useSelector((s) => s);

  console.log(state.context.draft);

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      price: state.context.draft?.price || undefined,
    },
  });

  async function handleSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    try {
      const res = await updateDraft(
        values as Partial<Draft>,
        state.context.draftId,
        'pricing'
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

  return (
    <div
      className={'flex min-h-svh flex-col items-center justify-center pb-16'}
    >
      <Form {...form}>
        <form
          className={'flex flex-col gap-6'}
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <FormWrapper
            onNext={() => {}}
            onBack={() => ref.send({ type: 'BACK' })}
            isLoading={isLoading}
          >
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem aria-autocomplete={'none'}>
                  <FormLabel>Monthly Rent</FormLabel>
                  <FormControl>
                    <Input
                      type={'number'}
                      placeholder="Select your monthly rent"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className={'text-center'}>
                    This is the monthly rent for your property listing
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </FormWrapper>
        </form>
      </Form>
    </div>
  );
}

export default PriceForm;

/*
'use client';
import React, { useEffect, useState } from 'react';
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
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Draft } from '@/lib/cimi/types/draftData.types';
import { updateDraft } from '@/lib/cimi/api/draft';
import { Button } from '@/components/ui/button';

const formSchema = z.object({
  price: z.coerce.number(),
});

function PriceForm() {
  const ref = WizardMachineContext.useActorRef();
  const state = WizardMachineContext.useSelector((s) => s);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {}, [state]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      price: state.context.draft?.price || undefined,
    },
  });

  async function handleSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    try {
      const res = await updateDraft(
        values as Partial<Draft>,
        state.context.draftId,
        'pricing'
      );

      if (res.error) {
        //bla bla resolve backend errors
        form.setError('price', { message: res.error });
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
        <form
          className={'flex flex-col gap-6'}
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <FormWrapper
            onNext={() => {}}
            onBack={() => ref.send({ type: 'BACK' })}
            isLoading={isLoading}
          >
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem aria-autocomplete={'none'}>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      type={'number'}
                      placeholder="Select your monthly rent"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This is the monthly rent for your property listing
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </FormWrapper>
        </form>
      </Form>
    </div>
  );
}

export default PriceForm;
*/
