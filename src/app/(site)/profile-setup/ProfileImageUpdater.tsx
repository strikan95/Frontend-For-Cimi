import React, { useRef } from 'react';
import { updateUserProfileImage } from '@/lib/auth/profile';
import { Loader2 } from 'lucide-react';

function ProfileImageUpdater({ picture }: { picture: string }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = React.useState(false);

  async function handleOnFileInput(event: React.FormEvent<HTMLInputElement>) {
    const currentFile = event.currentTarget?.files?.[0];

    if (currentFile) {
      setIsUploading(true);
      try {
        const formData = new FormData();
        formData.set('image', currentFile);

        const res = await updateUserProfileImage(formData);

        if (!res.error) {
        }
      } catch (e) {
        console.error(e);
      }
    }
    setIsUploading(false);
  }

  return (
    <form onSubmit={(event) => event.preventDefault()}>
      <input
        ref={inputRef}
        type="file"
        name="image"
        className={'hidden'}
        onInput={handleOnFileInput}
      />
      <div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">
        <img
          className="h-40 w-40 rounded-full object-cover p-1 ring-2 ring-indigo-300
            dark:ring-indigo-500"
          src={picture}
          alt="Bordered avatar"
        />

        <div className="flex flex-col space-y-5 sm:ml-8">
          <button
            type="button"
            className="rounded-lg border border-indigo-200 bg-[#202142] px-7 py-3.5 text-base
              font-medium text-indigo-100 hover:bg-indigo-900 focus:z-10 focus:outline-none
              focus:ring-4 focus:ring-indigo-200"
            disabled={isUploading}
            onClick={() => inputRef.current?.click()}
          >
            {isUploading ? (
              <Loader2 className={'animate-spin'} />
            ) : (
              'Change picture'
            )}
          </button>
        </div>
      </div>
    </form>
  );
}

export default ProfileImageUpdater;
