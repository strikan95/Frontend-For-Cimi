import React from 'react';
import MainSearchModal from '@/components/search/MainSearchModal';

function Header() {
  return (
    <header className={'pb-10'}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className={'mx-auto w-[200px]'}>
          <MainSearchModal />
        </div>
      </div>
    </header>
  );
}

export default Header;
