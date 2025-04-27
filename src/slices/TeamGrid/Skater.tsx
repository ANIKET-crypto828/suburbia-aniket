import React from 'react';
import { Content } from '@prismicio/client';
import { PrismicNextImage } from '@prismicio/next';
import { ButtonLink } from '@/components/ButtonLink';
import { SkaterScribble } from './SkaterScribble';
import clsx from 'clsx';

type Props = {
  skater: Content.SkaterDocument;
  index: number;
}

export function Skater({ skater, index }: Props) {
  const colors = [
    "text-brand-blue",
    "text-brand-lime",
    "text-brand-orange",
    "text-brand-pink",
    "text-brand-purple"
  ];

  const scribbleColor = colors[index % colors.length]; // Added modulo to prevent overflow

  return (
    <div className='group relative flex flex-col items-center gap-4'>
      <div className="relative h-[400px] w-full overflow-hidden rounded-lg">
        {/* Background Image */}
        <PrismicNextImage 
          field={skater.data.photo_background}
          fill
          imgixParams={{ q: 20 }}
          alt=''
          className='object-cover scale-110 transform transition-all duration-1000 ease-in-out group-hover:scale-100 group-hover:brightness-75 group-hover:saturate-[.8]'
        />
        
         {/* Scribble Overlay - Now with proper color inheritance */}
         <div className={clsx(
          "absolute inset-0 flex items-center justify-center",
          scribbleColor // Move color class here
        )}>
          <SkaterScribble 
            className="w-full h-full opacity-80 transition-all duration-300 group-hover:opacity-100 group-hover:scale-105"
          />
        </div>
        
        {/* Foreground Image (Skater) */}
        <div className="absolute inset-0 flex items-end justify-center">
          <PrismicNextImage 
            field={skater.data.photo_foreground}
            width={500} // Adjust as needed
            alt=''
            className='transform transition-transform duration-1000 ease-in-out group-hover:scale-110'
          />
        </div>
        
        {/* Gradient Overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black via-transparent to-transparent"></div>
        
        {/* Name */}
        <h3 className='absolute bottom-4 left-4 font-sans text-brand-gray ~text-2xl/3xl'>
          <span className='mb-[-.3em] block'>{skater.data.first_name}</span>
          <span className='block'>{skater.data.last_name}</span>
        </h3>
      </div>
      
      <ButtonLink field={skater.data.customizer_link} size='sm'>
        Build their board
      </ButtonLink>
    </div>
  );
}