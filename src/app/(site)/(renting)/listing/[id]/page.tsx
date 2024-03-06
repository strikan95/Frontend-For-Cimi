import React from 'react';
import { getListing } from '@/lib/cimi/api/listing';
import Image from 'next/image';
import { Heart, Share } from 'lucide-react';
import InlineSVG from 'react-inlinesvg';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import InquiryForm from '@/app/(site)/(renting)/listing/[id]/InquiryForm';
import MyMap from '@/app/(site)/(renting)/listing/[id]/MyMap';

function ListingGallery({
  images,
}: {
  images: { id: string; thumbnailUrl: string }[];
}) {
  return (
    <div className={'sm:grid sm:grid-cols-2 sm:gap-4'}>
      <div className={'relative col-span-1 aspect-square'}>
        <Image
          fill={true}
          src={images[0].thumbnailUrl}
          alt={''}
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div className={'hidden sm:col-span-1 sm:block'}>
        <div className={'grid aspect-square grid-cols-2 gap-4'}>
          {images
            .slice(1, images.length < 6 ? images.length : 5)
            .map((image, index) => (
              <div key={index} className={'relative col-span-1'}>
                <Image
                  fill={true}
                  src={image.thumbnailUrl}
                  alt={''}
                  style={{ objectFit: 'cover' }}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

async function Page({ params }: { params: { id: string } }) {
  const data = await getListing(params.id);

  if (data.error || !data.result) {
    throw Error('bla');
  }

  const listing = data.result;

  return (
    <div
      className={'relative flex min-h-[calc(100svh-4rem)] flex-col gap-6 pt-8'}
    >
      {/* Title bar */}
      <div className={'flex justify-between'}>
        <div>
          <h1 className={'text-4xl font-bold'}>{listing.title}</h1>
          <h2 className={'text-xl font-bold text-gray-500'}>
            {listing.description}
          </h2>
        </div>
        <div className={'flex items-center gap-4'}>
          <button className={'flex gap-2 align-bottom font-bold'}>
            Share
            <Share className={'inline h-5 w-5'} />
          </button>
          <button className={'flex gap-2 align-bottom font-bold'}>
            Save
            <Heart className={'inline h-5 w-5'} />
          </button>
        </div>
      </div>
      {/* Gallery */}
      <ListingGallery images={listing.images} />
      <Separator />
      {/* Basic Info Box */}
      <div>
        <h1 className={'text-3xl'}>A room in Zagreb, Croatia</h1>
        <p className={'text-lg text-gray-500'}>
          2 Bedrooms - 1 Bathroom - 1 Water Closet
        </p>
      </div>
      <div className={'flex flex-wrap'}>
        <div className={'flex w-full flex-col gap-6 md:w-[70%]'}>
          <div>
            <h2 className={'pb-2 text-xl font-bold'}>About this property:</h2>
            <p className={'pb-4'}>
              Affordable, modern design in an incredible First Hill location.
              That's the promise of The Rise on Madison. Our selection of
              income-restricted studio, one, two, and three-bedroom apartment
              homes offers Seattle living at its most vibrant. While our
              location doesn't have on-site parking, there is limited street
              parking available. Fortunately, our location is extremely
              walkable, bike-friendly, and conveniently close to public
              transportation options! Grocery, medical facilities, schools,
              restaurants, shopping...
            </p>
            <Button
              variant={'outline'}
              className={'border-2 border-black bg-[#EAEAEA]'}
            >
              Read more
            </Button>
          </div>
          <Separator />
          {/* Amenities Info Box */}
          <div>
            <h1 className={'pb-2 text-xl font-bold'}>
              What this place offers:
            </h1>
            <div className={'flex flex-wrap gap-6 pl-2 md:pl-0'}>
              {listing.amenities
                .slice(
                  0,
                  listing.amenities.length < 8 ? listing.amenities.length : 8
                )
                .map((amenity, index) => (
                  <div
                    className={
                      'flex w-full flex-nowrap items-center gap-2 sm:w-1/3'
                    }
                  >
                    <InlineSVG
                      style={{ width: '1.5rem', height: 'auto' }}
                      src={amenity.iconUrl}
                    />
                    <span className={'text-lg text-gray-900'}>
                      {amenity.name}
                    </span>
                  </div>
                ))}
              {listing.amenities.length > 8 && (
                <div className={'w-full'}>
                  <Button
                    variant={'outline'}
                    className={'border-2 border-black bg-[#EAEAEA]'}
                  >
                    Show more
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
        <Separator className={'my-6 md:hidden'} />
        <div
          className={
            'h-fit w-full md:sticky md:right-0 md:top-[4.5rem] md:w-[30%]'
          }
        >
          <div
            className={
              'mx-2 rounded-lg border border-gray-300 bg-white p-8 shadow-lg md:ml-16'
            }
          >
            <InquiryForm />
          </div>
        </div>
      </div>
      <Separator />

      <MyMap className={'h-96 w-full'} />
    </div>
  );
}

export default Page;
