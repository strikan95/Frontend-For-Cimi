import { Button } from '@/components/ui/button';
import React, { useEffect, useRef, useState } from 'react';
import { Loader2 } from 'lucide-react';
import {
  removeFromCloudinary,
  uploadToCloudinary,
} from '@/lib/cloudinary/actions';
import { removeDraftImage } from '@/components/wizard/actions';

export type Image = {
  id: string;
  url: string;
  file: File;
};

export function ImagePreview({
  image,
  onRemove,
}: {
  image: Image;
  onRemove: (image: Image) => void;
}) {
  async function handleRemove() {
    try {
      const res = await removeDraftImage(image.id);

      if (res.error) {
        console.error(res.error);
        return;
      }

      onRemove(image);
    } catch (e) {
      console.log(e);
    }
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
          <div className="relative z-10 flex h-full w-full flex-col items-center justify-center">
            <img
              src={URL.createObjectURL(image.file)}
              alt="Uploaded"
              className="h-full w-full rounded-lg object-cover"
            />
            <Button
              className={'absolute right-2 top-2'}
              type={'button'}
              onClick={handleRemove}
            >
              X
            </Button>
          </div>
        </label>
      </div>
    </div>
  );
}

export function Uploader({ onUpload }: { onUpload: (image: Image) => void }) {
  const formRef = useRef<HTMLFormElement>(null);

  const [file, setFile] = useState<File | undefined>(undefined);
  const [isUploading, setIsUploading] = useState(false);

  function clear() {
    setFile(undefined);
    setIsUploading(false);
  }

  useEffect(() => {
    if (!file) return;
    formRef.current?.requestSubmit();
  }, [file]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData(e.currentTarget);
    setIsUploading(true);

    try {
      const res = await uploadToCloudinary(formData);
      console.log('res', res);
      if (res.error || !res.result) {
        //toast error
        console.log(res.error);
        clear();
        return;
      }

      onUpload({
        id: res.result.public_id,
        url: res.result.url,
        file: file,
      });
    } catch (e) {
      //show toast with error
      console.error(e);
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
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              id={'img-uploader-form'}
            >
              <input
                type="file"
                name="image"
                className="hidden"
                onInput={(event) => setFile(event.currentTarget?.files?.[0])}
              />
            </form>
          </div>
        </label>
      </div>
    </div>
  );
}
