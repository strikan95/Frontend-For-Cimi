'use client';

import React, { useState } from 'react';
import { Image, ImagePreview, Uploader } from '@/components/ImageUploader';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateDraft } from '@/components/wizard/actions';
import { WizardMachineContext } from '@/components/wizard/machine/WizardMachineContext';
import { Form } from '@/components/ui/form';
import FormWrapper from '@/components/wizard/forms/FormWrapper';
import { Draft } from '@/types/draftData.types';

const formSchema = z.object({
  images: z
    .array(z.string().url('Not url'))
    .min(2, 'At least 5 photos are needed.'),
});

function ImagesForm() {
  const ref = WizardMachineContext.useActorRef();
  const state = WizardMachineContext.useSelector((s) => s);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { images: [] },
  });
  const [images, setImages] = useState<Image[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  function handleRemove(image: Image) {
    form.reset();
    form.unregister(`images.${images.indexOf(image)}`);
    setImages(images.filter((img) => img !== image));
  }

  function handleUpload(image: Image) {
    setImages((prevState) => [...prevState, image]);
  }

  const handleOnSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (
    values
  ) => {
    setIsLoading(true);

    try {
      const res = await updateDraft(values, '1', 'images');

      if (res.error) {
        //bla bla
        setIsLoading(false);
        return;
      }

      setIsLoading(false);
      ref.send({ type: 'NEXT', draft: res.result });
    } catch (e) {
      console.error(e);
      setIsLoading(false);
    }
  };

  return (
    <div
      className={
        'flex min-h-svh flex-col items-center justify-center pb-16 pt-16'
      }
    >
      <Form {...form}>
        <div className={'grid grid-cols-1 gap-6 lg:grid-cols-2'}>
          {images.map((img, index) => (
            <ImagePreview key={index} image={img} onRemove={handleRemove} />
          ))}
          <Uploader onUpload={handleUpload} />
        </div>
        <form onSubmit={form.handleSubmit(handleOnSubmit)}>
          <FormWrapper
            onNext={() => {}}
            onBack={() => ref.send({ type: 'BACK' })}
            isLoading={isLoading}
          >
            {images.map((img, index) => (
              <input
                {...form.register(`images.${index}`)}
                className={'border'}
                key={index}
                value={img.url}
                hidden
              />
            ))}
            {form.formState.errors.images && (
              <span>{form.formState.errors.images.root?.message}</span>
            )}
          </FormWrapper>
        </form>
      </Form>
    </div>
  );
}

export default ImagesForm;
