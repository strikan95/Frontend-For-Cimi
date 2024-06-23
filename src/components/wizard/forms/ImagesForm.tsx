'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import {
  addDraftImage,
  getDraftImages,
  removeDraftImage,
} from '@/components/wizard/actions';
import FormWrapper from '@/components/wizard/forms/FormWrapper';
import { WizardMachineContext } from '@/components/wizard/machine/WizardMachineContext';

type PhotoResponse = {
  id: string;
  thumbnailUrl: string;
  url: string;
};

type Photo = {
  id: string;
  url: string;
};

function ImagePreview(props: { src: string; onRemove: () => Promise<void> }) {
  const [isRemoving, setIsRemoving] = useState(false);

  async function onRemoveHandler() {
    setIsRemoving(() => true);
    await props.onRemove();
    setIsRemoving(false);
  }

  return (
    <>
      {isRemoving && <Loader2 className={'h-32 w-32 animate-spin'} />}
      <div className={'aspect-square w-64'}>
        <div className={'col-span-1 h-64 w-64 object-contain'}>
          <div className="flex w-full items-center justify-center">
            <label
              className="dark:hover:bg-bray-800 flex h-64 w-full cursor-pointer flex-col items-center
                justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50
                hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700
                dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div className="relative z-10 flex h-full w-full flex-col items-center justify-center">
                <img
                  src={props.src}
                  alt="Uploaded"
                  className="rounded-lg object-cover"
                />
                <Button
                  className={'absolute right-2 top-2'}
                  type={'button'}
                  onClick={onRemoveHandler}
                >
                  X
                </Button>
              </div>
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

function ImageUploader(props: { onUpload: (file: File) => Promise<void> }) {
  const [file, setFile] = useState<File>();
  const [isUploading, setIsUploading] = useState(false);

  function clear() {
    setFile(undefined);
    setIsUploading(false);
  }

  async function onUploadHandler(event: React.FormEvent<HTMLInputElement>) {
    const currentFile = event.currentTarget?.files?.[0];

    if (currentFile) {
      setFile(currentFile);
      setIsUploading(true);

      await props.onUpload(currentFile);
    }

    clear();
  }

  return (
    <div className={'col-span-1 h-64 w-64 object-contain'}>
      <div className="flex w-full items-center justify-center">
        <label
          className="dark:hover:bg-bray-800 flex h-64 w-full cursor-pointer flex-col items-center
            justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50
            hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700
            dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div className="z-10 flex h-full w-full flex-col items-center justify-center">
            {file && isUploading ? (
              <div className={'relative h-full w-full'}>
                <Loader2
                  className={'absolute left-2 top-2 m-0 animate-spin p-0'}
                />
                <div
                  className={
                    'absolute right-0 top-0 h-full w-full bg-gray-500 bg-opacity-50'
                  }
                ></div>
                <img
                  src={URL.createObjectURL(file)}
                  alt="Uploaded"
                  className="h-full w-full rounded-lg object-cover"
                />
              </div>
            ) : (
              <>
                <svg
                  className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </>
            )}
            <form>
              <input
                type="file"
                name="image"
                className="hidden"
                onInput={onUploadHandler}
              />
            </form>
          </div>
        </label>
      </div>
    </div>
  );
}

function ImagesForm({ draftId }: { draftId: string }) {
  const ref = WizardMachineContext.useActorRef();
  const state = WizardMachineContext.useSelector((s) => s);
  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    getDraftImages(state.context.draftId).then(async (res) => {
      console.log(res);

      if (res.result) {
        const photos = res.result?.reduce((acc: Photo[], photo) => {
          return [...acc, { id: photo.id, url: photo.thumbnailUrl }] as Photo[];
        }, []);

        setPhotos(() => {
          return photos;
        });
      }
    });
  }, []);

  async function addPhoto(file: File) {
    try {
      const formData = new FormData();
      formData.append('image', file);

      const res = await addDraftImage(formData, state.context.draftId);

      if (!res.error) {
        setPhotos((prevState) => {
          if (!res.result) return prevState;

          return [
            ...prevState,
            // @ts-ignore
            { id: res.result.id, url: res.result.thumbnailUrl },
          ];
        });
      }
    } catch (e) {
      console.error(e);
    }
  }

  async function removePhoto(id: string) {
    try {
      const res = await removeDraftImage(state.context.draftId, id);
      if (!res.error) {
        setPhotos((prevState) => {
          return prevState.filter((value) => {
            return value.id !== id;
          });
        });
      }
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div
      className={
        'flex min-h-svh flex-col items-center justify-center pb-16 pt-16'
      }
    >
      <FormWrapper
        onNext={() => ref.send({ type: 'NEXT' })}
        onBack={() => ref.send({ type: 'BACK' })}
        isLoading={false}
        disabled={photos.length < 4}
      >
        <div className={'grid grid-cols-1 gap-6 lg:grid-cols-2'}>
          {photos.map((photo, index) => {
            return (
              <ImagePreview
                key={index}
                src={photo.url}
                onRemove={() => removePhoto(photo.id)}
              />
            );
          })}
          <ImageUploader onUpload={addPhoto} />
        </div>
      </FormWrapper>
    </div>
  );
}

export default ImagesForm;
