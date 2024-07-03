import React from 'react';
import MainSearchModal from '@/components/search/MainSearchModal';
import { Navbar } from '@/components/Navigation';

export default function Home() {
  return (
    <>
      <div className={'md:mx-auto md:w-full md:max-w-[1400px] md:px-4'}>
        <div
          className={`flex min-h-[calc(100svh-4rem)] flex-col flex-wrap items-center justify-center
            md:flex-row`}
        >
          <div className={'w-full pb-16 sm:w-3/5 lg:w-2/5'}>
            <h1
              className="my-4 text-center text-3xl font-bold leading-tight text-[#252A34] opacity-75
                md:text-left md:text-5xl"
            >
              Searching For An Apartment?
            </h1>
            <p className="mb-8 text-center text-base leading-normal md:text-left md:text-2xl">
              Find an affordable apartment to your liking.
            </p>

            <div className="mb-4 w-full rounded-lg bg-[#5386e4] px-8 opacity-75 shadow-lg">
              <div className="py-8">
                <MainSearchModal />
              </div>
            </div>
          </div>
          <div className={'w-full sm:w-2/5 lg:w-3/5'}></div>
        </div>
      </div>
      <div className={'bg-[#252a34] text-white'}>
        <div className={'md:mx-auto md:w-full md:max-w-[1400px] md:px-4'}>
          <div className={'flex h-16 items-center py-2'}>Footer</div>
        </div>
      </div>
    </>
  );
}
