'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const PrettyLink = React.forwardRef<
  React.ElementRef<typeof Link>,
  React.ComponentPropsWithoutRef<typeof Link>
>(({ className, ...props }, ref) => {
  const pathName = usePathname();
  const isActive = pathName === props.href;

  return (
    <Link
      ref={ref}
      className={cn(`${isActive && 'underline underline-offset-2'}`, className)}
      {...props}
    />
  );
});
PrettyLink.displayName = Link.displayName;

export { PrettyLink };
