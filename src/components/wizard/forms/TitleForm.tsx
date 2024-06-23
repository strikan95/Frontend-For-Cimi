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
import { updateDraft } from '@/components/wizard/actions';
import { Button } from '@/components/ui/button';

const formSchema = z.object({
  title: z.string().min(10).max(64),
});

function TitleForm() {
  const ref = WizardMachineContext.useActorRef();
  const state = WizardMachineContext.useSelector((s) => s);

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: state.context.draft?.title || '',
    },
  });

  async function handleSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    try {
      const res = await updateDraft(
        values as Partial<Draft>,
        state.context.draftId,
        'title'
      );

      if (res.error) {
        //bla bla resolve backend errors
        form.setError('title', { message: res.error });
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
              name="title"
              render={({ field }) => (
                <FormItem aria-autocomplete={'none'}>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Chose a title for your property..."
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This is a public title for your property listing
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

export default TitleForm;
