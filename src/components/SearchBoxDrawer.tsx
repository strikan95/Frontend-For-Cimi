import * as React from 'react';

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import SearchBox, { SearchBoxOptionType } from '@/components/SearchBox';

const places: SearchBoxOptionType[] = [
  { value: 'Osijek, Croatia' },
  { value: 'Zagreb, Croatia' },
  { value: 'Zadar, Croatia' },
  { value: 'Split, Croatia' },
  { value: 'Rijeka, Croatia' },
];

function SearchBoxDrawer({
  isOpen,
  setIsOpen,
  setSelected,
  location,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<any>;
  setSelected: React.Dispatch<any>;
  location: unknown;
}) {
  function onSelected(selected: unknown) {
    setSelected(selected);
    setIsOpen(false);
  }

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerContent>
        <div className="mx-auto flex h-[48rem] w-full max-w-md flex-col overflow-auto rounded-t-[10px] p-4">
          <DrawerHeader>
            <DrawerTitle>Where to?</DrawerTitle>
            <DrawerDescription>Select a location where you want to search listings.</DrawerDescription>
          </DrawerHeader>
          <div className={'flex-1 flex-col'}>
            <SearchBox options={places} handleSelection={onSelected} />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export default SearchBoxDrawer;
