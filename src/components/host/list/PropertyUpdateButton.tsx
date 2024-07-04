'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type Props = {
  id: number;
};

function PropertyUpdateButton({ id }: Props) {
  const router = useRouter();

  function handleClick() {
    router.push(`/create-a-listing/${id}`);
  }

  return (
    <>
      <button
        onClick={handleClick}
        className="rounded-2xl bg-gray-800 py-1 text-white"
      >
        <Link href={`/create-a-listing/${id}`}>Edit</Link>
      </button>
    </>
  );
}

export default PropertyUpdateButton;
