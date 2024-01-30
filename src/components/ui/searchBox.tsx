'use client';

import React, { InputHTMLAttributes } from 'react';
import * as HeadlessUIPrimitives from '@headlessui/react';
import { Combobox } from '@headlessui/react';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

const ComboboxPrimitive = HeadlessUIPrimitives.Combobox;

const SearchBox = ({
  ...props
}: React.ComponentProps<typeof ComboboxPrimitive>) => (
  <ComboboxPrimitive {...props} />
);
SearchBox.displayName = 'SearchBox';

interface BlaProps extends InputHTMLAttributes<HTMLInputElement> {
  handleClear: () => void;
  displayClear: boolean;
}

const NewSearchInput = React.forwardRef<
  React.ElementRef<typeof ComboboxPrimitive.Input>,
  BlaProps & React.ComponentPropsWithoutRef<typeof ComboboxPrimitive.Input>
>(({ className, handleClear, displayClear, ...props }, ref) => {
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  React.useEffect(() => {
    if (inputRef.current && displayClear) {
      inputRef.current.focus();
    }
  }, [displayClear]);

  return (
    <div className={'relative w-full'}>
      <ComboboxPrimitive.Input
        className={cn(
          className,
          `w-full rounded-lg rounded-b-none border border-b-0 border-gray-300 p-4 shadow
            outline-none`
        )}
        ref={inputRef as React.RefObject<HTMLInputElement> | null}
        {...props}
      />
      <button
        hidden={displayClear}
        className={'absolute inset-y-0 right-2'}
        onClick={handleClear}
      >
        <X />
      </button>
    </div>
  );
});

const NewNewSearchInput = ({
  className,
  handleClear,
  displayClear,
  ...props
}: React.ComponentProps<typeof ComboboxPrimitive.Input> &
  React.InputHTMLAttributes<HTMLInputElement> & {
    handleClear: () => void;
    displayClear: boolean;
  }) => {
  return (
    <div className={'relative w-full'}>
      <ComboboxPrimitive.Input
        className={cn(
          className,
          `w-full rounded-lg rounded-b-none border border-b-0 border-gray-300 p-4 shadow
            outline-none`
        )}
        {...props}
      />
      <button
        hidden={displayClear}
        className={'absolute inset-y-0 right-2'}
        onClick={handleClear}
      >
        <X />
      </button>
    </div>
  );
};

const SearchInput = React.forwardRef<
  React.ElementRef<typeof ComboboxPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof ComboboxPrimitive.Input>
>(({ className, ...props }, ref) => (
  <ComboboxPrimitive.Input
    className={cn(
      className,
      `w-full rounded-lg rounded-b-none border border-b-0 border-gray-300 p-4 shadow-lg
        outline-none`
    )}
    {...props}
  />
));
SearchInput.displayName = 'SearchInput';

const SearchOptions = React.forwardRef<
  React.ElementRef<typeof ComboboxPrimitive.Options>,
  React.ComponentPropsWithoutRef<typeof ComboboxPrimitive.Options>
>(({ className, children, ...props }, ref) => (
  <ComboboxPrimitive.Options
    className={cn(
      className,
      `max-h-64 w-full overflow-y-scroll rounded-lg rounded-t-none border border-t-0
        border-gray-300 p-2`
    )}
    {...props}
  >
    {children}
  </ComboboxPrimitive.Options>
));
SearchOptions.displayName = 'SearchOptions';

const SearchItem = React.forwardRef<
  React.ElementRef<typeof ComboboxPrimitive.Option>,
  React.ComponentPropsWithoutRef<typeof ComboboxPrimitive.Option>
>(({ className, children, ...props }, ref) => (
  <Combobox.Option
    className={({ active }: { active: boolean }) =>
      cn(
        'flex h-16 items-center rounded',
        active ? 'lg:bg-teal-600 lg:text-white' : 'lg:text-gray-900'
      )
    }
    {...props}
  >
    {children}
  </Combobox.Option>
));
SearchInput.displayName = 'SearchItem';

export { SearchBox, SearchInput, NewSearchInput, SearchOptions, SearchItem };
