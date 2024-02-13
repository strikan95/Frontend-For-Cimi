'use client';
import React, { useState } from 'react';
import FormWrapper from '@/app/(wizard)/create-a-listing/components/FormWrapper';
import { WizardMachineContext } from '@/app/(wizard)/create-a-listing/machine/WizardMachineContext';
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
import { Draft } from '@/types/draftData.types';
import { updateDraft } from '@/app/(wizard)/create-a-listing/actions';

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
      const res = await updateDraft(values as Partial<Draft>, '1', 'title');

      if (res.error) {
        //bla bla resolve backend errors
        form.setError('title', { message: 'Title is wrong' });
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
    <div>
      <Form {...form}>
        <form
          className={'flex flex-col gap-6'}
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <FormWrapper onNext={() => {}} isLoading={isLoading}>
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
