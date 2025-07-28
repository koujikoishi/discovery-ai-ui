'use client';

import React from 'react';
import Image from 'next/image';
import botIcon from '@/public/boticon.svg';

export default function InitialMessage() {
  return (
    <div className="flex flex-col items-center justify-center flex-grow pt-[15vh] pb-10 min-h-[300px]">
      <Image
        src={botIcon}
        alt="Bot icon"
        width={32}
        height={32}
        className="mb-5 animate-gentle-wiggle"
      />
      <p className="text-2xl font-bold mb-2">こんにちは。</p>
      <p className="text-base text-gray-400 mb-6">何かお手伝いできることはありますか？</p>
    </div>
  );
}
