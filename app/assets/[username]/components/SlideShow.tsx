'use client';

import { Button } from '@/components/ui/button';
import { Div } from '@/wrappers/HTMLWrappers';
import Image from 'next/image';
import React from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

interface Props {
  slideUrls?: string[];
  onLoadMore: () => unknown;
}

export const SlideShow: React.FC<Props> = ({ slideUrls, onLoadMore }) => {
  return (
    <Div className="flex w-full">
      <Div className="w-full">
        <Slide>
          <Div className="flex flex-col md:flex-row overflow-y-auto md:overflow-x-auto w-full space-y-1 md:space-y-0 space-x-0 md:space-x-1 snap-y md:snap-x snap-mandatory scrollbar-hide scroll-smooth m-1 p-1">
            {slideUrls &&
              slideUrls.map((url, index) => (
                <Image
                  src={url}
                  key={index}
                  alt="preview"
                  width={'1000'}
                  height={1000}
                  className="w-full h-[calc(100vh-136px)] snap-center"
                />
              ))}
            <Div className="my-auto bg-transparent justify-center w-fit h-fit md:-rotate-90 origin-center">
              <Button onClick={onLoadMore}>Next</Button>
            </Div>
          </Div>
        </Slide>
      </Div>
    </Div>
  );
};
