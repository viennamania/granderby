import React from 'react';
import Image from '@/components/ui/image';
import AuthorImage from '@/assets/images/profile.png';

///import NFT1 from '@/assets/images/nft/nft-1.jpg';
import NFT1 from '@/assets/images/nft/Hrs_00006000.png';

import Avatar from '@/components/ui/avatar';

import { useDrawer } from '@/components/drawer-views/context';
import Button from '@/components/ui/button';
import { Close } from '@/components/icons/close';

export default function PreviewContent() {
  const { closeDrawer } = useDrawer();

  return (
    <div className="w-full xs:w-96">
      <Button
        shape="circle"
        color="white"
        onClick={closeDrawer}
        className="dark:bg-light-dark"
      >
        <Close className="h-auto w-3" />
      </Button>

      <div className="relative flex flex-grow flex-col overflow-hidden rounded-lg bg-white shadow-card transition-all duration-200 hover:shadow-large dark:bg-light-dark">
        <div className="flex items-center p-4 text-sm font-medium text-gray-600 transition hover:text-gray-900 dark:text-gray-400">
          <Avatar
            size="sm"
            image={AuthorImage}
            alt="Rubywalsh"
            className="border-white bg-gray-300 ltr:mr-3 rtl:ml-3 dark:bg-gray-400"
          />
          @Rubywalsh
        </div>
        <div className="relative block w-full">
          <Image
            src={NFT1}
            placeholder="blur"
            width={467}
            alt="Pulses of Imagination #214"
          />
        </div>
        <div className="p-5">
          <div className="text-sm font-medium text-black dark:text-white">
            Pulses Of Imagination #214
          </div>
          <div className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
            0.40 ETH
          </div>
        </div>
      </div>
    </div>
  );
}
