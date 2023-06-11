import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CurrencySwapIcons from '@/components/ui/currency-swap-icons';
import { CoinList } from '@/components/ui/currency-swap-icons';
import TransactionInfo from '@/components/ui/transaction-info';

import { HorseIcon } from '@/components/icons/horse';

import { ThirdwebSDK } from '@thirdweb-dev/sdk';

import { contractAddressRace } from '../../config/contractAddresses';

import { BigNumber, ethers } from 'ethers';

interface RaceListTypes {
  from: string;
  to: string;
  earned: string;
  apr: string;
  liquidity: string;
  multiplier: string;
}

const sdk = new ThirdwebSDK('polygon');

export default function RaceList({
  from,
  to,
  earned,
  apr,
  liquidity,
  multiplier,
  children,
}: React.PropsWithChildren<RaceListTypes>) {
  let [isExpand, setIsExpand] = useState(false);
  const setFrom = from as CoinList;
  const setTo = to as CoinList;

  const [totalSupply, setTotalSupply] = useState<BigNumber>(0);

  useEffect(() => {
    const main = async () => {
      const contract = await sdk.getContract(contractAddressRace);

      const totalSupply = await contract.erc1155.totalSupply(0);

      console.log('totalSupply', totalSupply);

      setTotalSupply(totalSupply);
    };

    main();
  }, []);

  return (
    <div className="relative mb-3 overflow-hidden rounded-lg bg-white shadow-card transition-all last:mb-0 hover:shadow-large dark:bg-light-dark">
      <div
        className="relative grid h-auto cursor-pointer grid-cols-2 items-center gap-3 py-4 sm:h-20 sm:grid-cols-3 sm:gap-6 sm:py-0 lg:grid-cols-5"
        onClick={() => setIsExpand(!isExpand)}
      >
        <div className="col-span-2 px-4 sm:col-auto sm:px-8 xl:px-4">
          {/*
          <CurrencySwapIcons from={setFrom} to={setTo} />
        */}
          <HorseIcon />
        </div>

        <div className="px-4 text-xs font-medium uppercase tracking-wider text-black dark:text-white sm:px-8 sm:text-sm">
          <span className="mb-1 block font-medium text-gray-600 dark:text-gray-400 sm:hidden">
            Race Num
          </span>
          {earned}
        </div>

        <div className="px-4 text-xs font-medium uppercase tracking-wider text-black dark:text-white sm:px-8 sm:text-sm">
          <span className="mb-1 block font-medium text-gray-600 dark:text-gray-400 sm:hidden">
            Entry Count
          </span>
          {Number(ethers.utils.formatUnits(totalSupply, 0)).toFixed(0)}
        </div>

        {/*

        <div className="px-4 text-xs font-medium uppercase tracking-wider text-black dark:text-white sm:px-8 sm:text-sm">
          <span className="mb-1 block font-medium text-gray-600 dark:text-gray-400 sm:hidden">
            APR
          </span>
          {apr}
          <span className="hidden font-normal text-gray-600 dark:text-gray-400 sm:block">
            Annualized
          </span>
        </div>

        <div className="hidden px-4 text-xs font-medium uppercase tracking-wider text-black dark:text-white sm:px-8 sm:text-sm lg:block">
          {liquidity}
        </div>

        <div className="hidden px-4 text-xs font-medium uppercase tracking-wider text-black dark:text-white sm:px-8 sm:text-sm lg:block">
          {multiplier}
        </div>
      */}
      </div>

      <AnimatePresence initial={false}>
        {isExpand && (
          <motion.div
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: 'auto' },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
          >
            <div className="border-t border-dashed border-gray-200 px-4 py-4 dark:border-gray-700 sm:px-8 sm:py-6">
              {/*
              <div className="mb-6 flex items-center justify-center rounded-lg bg-gray-100 p-3 text-center text-xs font-medium uppercase tracking-wider text-gray-900 dark:bg-gray-900 dark:text-white sm:h-13 sm:text-sm">
                get {from}/{to} lp tokens for staking
              </div>
              */}

              <div className="mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:hidden">
                <div className="flex flex-col gap-3 sm:gap-4">
                  <TransactionInfo
                    label="Liquidity:"
                    value={liquidity}
                    className="text-xs sm:text-sm"
                  />
                  <TransactionInfo
                    label="Multiplier:"
                    value={multiplier}
                    className="text-xs sm:text-sm"
                  />
                </div>
              </div>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
