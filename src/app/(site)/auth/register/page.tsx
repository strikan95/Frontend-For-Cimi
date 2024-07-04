'use client';

import { FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import RegisterForm from '@/components/profile/RegisterForm';

export default function Home() {
  return (
    <div
      className={`flex min-h-[calc(100svh-4rem)] flex-col flex-wrap items-center justify-center
        md:flex-row`}
    >
      <RegisterForm />
    </div>
  );
}
