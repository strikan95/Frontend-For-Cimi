'use client';

import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useSession } from 'next-auth/react';
import { updateUserProfileImage } from '@/lib/cimi/api/profile';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, User } from 'lucide-react';

function ProfileImageUpdater({ picture }: { picture?: string }) {
  const [isUpdating, setIsUpdating] = React.useState(false);

  const { data, update } = useSession();
  const toast = useToast();
  const [file, setFile] = useState<File | null>(null);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  }

  async function handleImage(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsUpdating(true);
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    const res = await updateUserProfileImage(formData);

    if (res.error || res.result == null) {
      toast.toast({
        title: 'Failure',
        description: res.error,
      });
      setIsUpdating(false);
      setFile(null);
      return;
    }

    const resData = res.result;
    const updatedUserProfile = {
      ...data,
      user: {
        ...data?.user,
        image: resData.picture,
      },
    };

    toast.toast({
      title: 'Success',
      description: 'Profile image updated!',
    });
    await update(updatedUserProfile);
    setIsUpdating(false);
  }

  return (
    <div className={'flex justify-center align-middle'}>
      <form onSubmit={handleImage}>
        <label className="rounded-full">
          <input
            onChange={handleChange}
            className={'hidden'}
            type="file"
            name="picture"
          />
          {!picture && !file ? (
            <User
              className={'h-36 w-36 rounded-full border-2 border-gray-500'}
            />
          ) : (
            <Image
              width={720}
              height={480}
              className={'h-36 w-36 rounded-full'}
              src={file != null ? URL.createObjectURL(file) : picture || ''}
              alt={''}
            />
          )}
        </label>
        <Button disabled={file == null} className={'mt-4 w-full'} type="submit">
          {isUpdating ? <Loader2 className={'animate-spin'} /> : 'Update Image'}
        </Button>
      </form>
    </div>
  );
}

export default ProfileImageUpdater;
