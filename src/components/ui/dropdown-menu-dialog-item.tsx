import * as React from 'react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import * as Dialog from '@radix-ui/react-dialog';
import { Button } from '@/components/ui/button';

const DropdownDialogItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item> & { className?: string },
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    triggerChildren: string;
    onOpenChange: (open: boolean) => void;
  }
>((props, forwardedRef) => {
  const { triggerChildren, children, onSelect, onOpenChange, ...itemProps } =
    props;
  return (
    <Dialog.Root onOpenChange={onOpenChange}>
      <Dialog.Trigger asChild>
        <DropdownMenuPrimitive.Item
          className={`relative flex cursor-pointer select-none items-center rounded-sm px-4 py-4
            text-sm outline-none transition-colors focus:bg-accent
            focus:text-accent-foreground data-[disabled]:pointer-events-none
            data-[disabled]:opacity-50`}
          {...itemProps}
          ref={forwardedRef}
          onSelect={(event) => {
            event.preventDefault();
            onSelect && onSelect(event);
          }}
        >
          {triggerChildren}
        </DropdownMenuPrimitive.Item>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay
          className={`fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in
            data-[state=closed]:animate-out data-[state=closed]:fade-out-0
            data-[state=open]:fade-in-0`}
        />
        <Dialog.Content
          className={`fixed left-[50%] top-[50%] z-50 flex h-full w-full translate-x-[-50%]
            translate-y-[-50%] flex-col justify-center gap-1 bg-background p-6 duration-200
            data-[state=open]:animate-in data-[state=closed]:animate-out
            data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0
            data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95
            data-[state=closed]:slide-out-to-left-1/2
            data-[state=closed]:slide-out-to-top-[48%]
            data-[state=open]:slide-in-from-left-1/2
            data-[state=open]:slide-in-from-top-[48%] sm:h-fit sm:max-w-lg sm:gap-4
            sm:rounded-lg sm:border sm:shadow-lg`}
        >
          <div className={'w-full'}>{children}</div>
          <Dialog.Close asChild>
            <Button className={'w-full'}>Cancel</Button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
});

DropdownDialogItem.displayName = 'DropdownDialogItem';

export { DropdownDialogItem };
