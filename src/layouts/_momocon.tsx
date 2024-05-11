import Logo from '@/components/ui/logo';
import cn from 'classnames';
import { FlashIcon } from '@/components/icons/flash';
import SearchButton from '@/components/search/button';
import ActiveLink from '@/components/ui/links/active-link';
import Hamburger from '@/components/ui/hamburger';
import WalletConnect from '@/components/nft/wallet-connect';

import { MenuItems } from '@/layouts/sidebar/_layout-menu';

import { useIsMounted } from '@/lib/hooks/use-is-mounted';
import { useBreakpoint } from '@/lib/hooks/use-breakpoint';
import { useDrawer } from '@/components/drawer-views/context';
import { useWindowScroll } from '@/lib/hooks/use-window-scroll';
import routes from '@/config/routes';
import { useRouter } from 'next/router';

import Image from '@/components/ui/image';
import logo from '@/assets/images/logo.png';

import LogoMomocon from '@/assets-landing/images/logo-momocon.svg';

import { Github } from '@/components/icons/brands/github';
import { Instagram } from '@/components/icons/brands/instagram';
import { Twitter } from '@/components/icons/brands/twitter';
import { Facebook } from '@/components/icons/brands/facebook';
import { Check } from '@/components/icons/check';
import { Copy } from '@/components/icons/copy';
import { SearchIcon } from '@/components/icons/search';
import AnchorLink from '@/components/ui/links/anchor-link';

import { nftDropContractAddressHorse } from '@/config/contractAddresses';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';

import {
  ThirdwebProvider,
  smartWallet,
  embeddedWallet,
  ConnectWallet,
  useAddress,
  useNFT,
  useContract,
  usePaperWalletUserEmail,
  useDisconnect,
  useTokenBalance,
} from '@thirdweb-dev/react';

import { darkTheme, lightTheme } from '@thirdweb-dev/react';

import { useTranslation } from 'react-i18next';

import { useState, useEffect } from 'react';

import LiveNftPricingSlider from '@/components/ui/live-nft-horse-pricing-slider';

import NftSinglePrice from '@/components/nft-pricing-table/nft-single-price';

import CollapseLastWinners from '@/components/ui/collapse-last-winners';
import LastWinners from '@/components/horseRace/watchScreen/lastWinnersGranderby';

import MailOutlineIcon from '@mui/icons-material/MailOutline';

import DefaultProfileImage from '@/assets/images/profile-default.png';

import {
  tokenContractAddressUSDT,
  tokenContractAddressGDP,
} from '@/config/contractAddresses';

//import { FlagIcon } from 'flag-icons'

function NotificationButton() {
  return (
    <ActiveLink href={routes.notification}>
      <div className="relative flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-gray-100 bg-white text-brand shadow-main transition-all hover:-translate-y-0.5 hover:shadow-large focus:-translate-y-0.5 focus:shadow-large focus:outline-none dark:border-gray-700 dark:bg-light-dark dark:text-white sm:h-12 sm:w-12">
        <FlashIcon className="h-auto w-3 sm:w-auto" />
        <span className="absolute right-0 top-0 h-2.5 w-2.5 rounded-full bg-brand shadow-light dark:bg-white sm:h-3 sm:w-3" />
      </div>
    </ActiveLink>
  );
}

function HeaderRightArea() {
  const isMounted = useIsMounted();
  const breakpoint = useBreakpoint();
  const { openDrawer, isOpen } = useDrawer();

  const address = useAddress();

  const router = useRouter();

  const { i18n } = useTranslation();
  const [isOpenLng, setIsOpenLng] = useState<boolean>(false);

  const [isOpenLogout, setIsOpenLogout] = useState<boolean>(false);
  const disconnect = useDisconnect();

  const handleLanguageChange = async (language: any) => {
    ///await i18n.changeLanguage(language.key);
    setIsOpenLng(false);
  };

  const LANGUAGE_SELECTOR_ID = 'language-selector';

  useEffect(() => {
    const handleWindowClick = (event: any) => {
      const target = event.target.closest('button');
      if (target && target.id === LANGUAGE_SELECTOR_ID) {
        return;
      }
      setIsOpenLng(false);
    };
    window.addEventListener('click', handleWindowClick);
    return () => {
      window.removeEventListener('click', handleWindowClick);
    };
  }, []);

  const [languageKey, setLanguageKey] = useState('en_US'); // kr , en_US

  const [languages, setLanguages] = useState<any[]>([]);

  useEffect(() => {
    const setupLanguages = async () => {
      const appLanguages = await fetch(
        'https://cdn.simplelocalize.io/b00816c4b6244e4ba53349703e52d44d/_latest/_languages'
      ).then((response) => response.json());

      console.log('appLanguage', appLanguages);

      setLanguages(appLanguages);
    };
    setupLanguages();
  }, []);

  ///console.log('i18n.language', i18n.language);

  const [countryCode, setCountryCode] = useState('en');

  const selectedLanguage = languages.find(
    //(language) => language.key === i18n.language
    (language) => language.key === languageKey
  );

  // ...

  const { contract: nftDropContract, isLoading: isLoadingContract } =
    useContract(nftDropContractAddressHorse, 'nft-drop');

  const tokenid = 300;

  const { data: nftMetadata, isLoading } = useNFT(nftDropContract, tokenid);

  const [isOpenWelcome, setIsOpenWelcome] = useState(false);

  /*
  const [npcNames, setNpcNames] = useState<any>([]);
  useEffect(() => {
    async function getNpcNames() {
      const npcNamesResponse = await fetch(
        `/api/games/horseRace/settings/horseNames?method=all`
      );
      const response = await npcNamesResponse.json();

      //console.log('getNpcNames response.npcNames[0]', response.npcNames[0]);

      //const data = useOwnedNFTs(nftDropContractHorse, address);

      setNpcNames(response.npcNames[0]);
    }

    getNpcNames();
  }, []);
  */

  const emailQuery = usePaperWalletUserEmail();

  useEffect(() => {
    async function checkUser() {
      if (address) {
        //console.log('address: ', address);
        //console.log('emailQuery: ', emailQuery);

        var email = '';

        if (emailQuery.data) {
          email = emailQuery.data;
        } else {
          email = address + '@granderby.io';
        }

        const username = email;
        const password = '12345678';

        const formInputs = {
          username: username,
          email: email,
          pass1: password,
          pass2: password,
          walletAddress: address,
          //bonus: settings?.welcomeBonus ?? 0
          bonus: 0,
        };

        const res = await fetch('/api/user?method=create', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formInputs),
        });
        const data = await res.json();

        ///console.log('data: ', data);

        if (data.status) {
          //console.log('data: ', data);
        } else {
          //console.log('user: ', data.user);
        }
      }
    }

    checkUser();
  }, [address, emailQuery]);

  const { contract: tokenContractUSDT } = useContract(
    tokenContractAddressUSDT,
    'token'
  );
  const { data: tokenBalanceUSDT, isLoading: isLoadingBalanceUSDT } =
    useTokenBalance(tokenContractUSDT, address);

  const { contract: tokenContractGDP } = useContract(
    tokenContractAddressGDP,
    'token'
  );

  //console.log('tokenContractGDP', tokenContractGDP);

  const { data: tokenBalanceGDP, isLoading: isLoadingBalanceGDP } =
    useTokenBalance(tokenContractGDP, address);

  ///console.log('tokenBalanceGDP', tokenBalanceGDP);

  return (
    <div className="flex flex-col items-end justify-center gap-3  lg:flex-row lg:items-center lg:gap-5">
      <div className=" flex shrink-0 items-center">
        <div className="ltr:mr-3.5 rtl:ml-3.5 ltr:sm:mr-5 rtl:sm:ml-5 xl:hidden">
          {/*
          <SearchButton
            color="white"
            className="shadow-main dark:border dark:border-solid dark:border-gray-700 dark:bg-light-dark dark:text-white"
          />
          */}
        </div>

        <div className="hidden  items-center gap-2  lg:flex">
          {isMounted && ['xs', 'sm', 'md', 'lg'].indexOf(breakpoint) == -1 && (
            <div>
              {/*
              <SearchButton variant="transparent" className="dark:text-white" />
            */}

              {/*address && (
                <button
                  //onClick={() => setIsOpenLng(!isOpenLng)}
                  type="button"
                  className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  //id={LANGUAGE_SELECTOR_ID}
                  //aria-expanded={isOpenLng}
                >
                  My Page
                </button>
              )*/}
            </div>
          )}

          {/*
          <NotificationButton />
          */}

          {/*
          <WalletConnect />
          */}

          {/*
          {address ? (
            <></>
          ) : (
          */}

          {!isLoadingContract && !address && (
            <ConnectWallet
              theme="light"
              welcomeScreen={() => {
                return (
                  <div className=" mt-10 flex flex-col items-center justify-center p-20">
                    <Image
                      src="/images/logo.png"
                      alt="logo"
                      width={300}
                      height={300}
                    />
                  </div>
                );
              }}
              btnTitle="Login"
            />
          )}
        </div>

        {isLoadingContract && !address && (
          <span className="text-lg text-green-600">Loading Wallet Info...</span>
        )}

        {address && (
          <>
            <div className="items-cneter ml-2 flex">
              <button
                onClick={() => setIsOpenLogout(!isOpenLogout)}
                type="button"
                className="inline-flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                aria-expanded={isOpenLogout}
              >
                {/* profile image */}
                <Image
                  src={DefaultProfileImage}
                  alt="avatar"
                  width={30}
                  height={30}
                />

                <span className="ml-2 ">{address?.substring(0, 6)}...</span>
                <svg
                  className="-me-1 ms-2 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L10 12.586l3.293-3.293a1 1 0 011.414 1.414l-4 4z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>

            {isOpenLogout && (
              <div
                className="absolute right-40 mt-40 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5"
                role="menu"
                aria-orientation="vertical"
              >
                <div className="grid grid-cols-1 gap-2 py-1" role="none">
                  <button
                    onClick={() => {
                      setIsOpenLogout(false);
                      router.push('/mypage');
                    }}
                    className="block items-center px-4 py-2 text-start text-sm hover:bg-gray-100"
                    role="menuitem"
                  >
                    {/*
                            <FlagIcon countryCode={language.key}/>
                            */}
                    &nbsp;<span className="truncate">MY PAGE</span>
                  </button>

                  <button
                    onClick={disconnect}
                    className="block  items-center px-4 py-2 text-start text-sm hover:bg-gray-100"
                    role="menuitem"
                  >
                    {/*
                            <FlagIcon countryCode={language.key}/>
                            */}
                    &nbsp;<span className="truncate">LOGOUT</span>
                  </button>
                </div>
              </div>
            )}

            {/* message view button */}
            {/* route to message page */}
            <div className="items-cneter ml-2 flex">
              <button
                onClick={() => router.push('/mypage/inbox/game')}
                type="button"
                className="inline-flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                {/* message icon MailOutlineIcon */}
                <MailOutlineIcon className="h-5 w-5" />

                {/* notify icon */}
                {/* if new message then show notify icon */}
                {/*
                <span className="ml-2">
                  <span className="w-2 h-2 rounded-full bg-red-500 inline-block" />
                </span>
                */}
              </button>
            </div>

            {/*}
            <div className="items-cneter ml-2 flex">
              <button
                onClick={() => router.push('/mypage/inbox/gift')}
                type="button"
                className="inline-flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                
                <CardGiftcardIcon className="h-5 w-5" />

              </button>
            </div>
            */}
          </>
        )}

        {!address && (
          <div className="items-cneter ml-2 flex">
            <button
              onClick={() => setIsOpenLng(!isOpenLng)}
              type="button"
              className="inline-flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              id={LANGUAGE_SELECTOR_ID}
              aria-expanded={isOpenLng}
            >
              {selectedLanguage?.key === 'kr' ? (
                <span className="fi fis fi-kr " />
              ) : (
                <span className="fi fis fi-us " />
              )}
              {/*
              <FlagIcon countryCode={selectedLanguage.key}/>
              */}
              &nbsp;{selectedLanguage?.name}
              <svg
                className="-me-1 ms-2 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L10 12.586l3.293-3.293a1 1 0 011.414 1.414l-4 4z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        )}

        {isOpenLng && (
          <div
            className="absolute right-5 mt-40 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby={LANGUAGE_SELECTOR_ID}
          >
            <div className="grid grid-cols-1 gap-2 py-1" role="none">
              {languages.map((language, index) => {
                return (
                  <button
                    key={language.key}
                    onClick={() => handleLanguageChange(language)}
                    className={`${
                      selectedLanguage?.key === language.key
                        ? 'bg-gray-100 text-gray-900'
                        : 'text-gray-700'
                    } block inline-flex items-center px-4 py-2 text-start text-sm hover:bg-gray-100 ${
                      index % 2 === 0 ? 'rounded-r' : 'rounded-l'
                    }`}
                    role="menuitem"
                  >
                    {/*
                            <FlagIcon countryCode={language.key}/>
                            */}
                    {language.key === 'kr' ? (
                      <span className="fi fis fi-kr " />
                    ) : (
                      <span className="fi fis fi-us " />
                    )}
                    &nbsp;<span className="truncate">{language.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div className="flex items-center lg:hidden">
          {/*
          <NotificationButton />
          */}

          <Hamburger
            isOpen={isOpen}
            onClick={() => openDrawer('DRAWER_MENU')}
            color="white"
            className="shadow-main ltr:ml-3.5 rtl:mr-3.5 dark:border dark:border-solid dark:border-gray-700 dark:bg-light-dark dark:text-white ltr:sm:ml-5 rtl:sm:mr-5"
          />
        </div>
      </div>

      {address && (
        <div className="flex flex-row items-center gap-3 lg:flex-col lg:gap-1">
          <span className="text-xl lg:text-lg ">
            {isLoadingBalanceGDP
              ? 'Loading...'
              : //Number(tokenBalanceGDP?.displayValue).toFixed(2)
                // display money format
                // Invalid currency code

                // format => 000,000GDP

                Number(tokenBalanceGDP?.displayValue)
                  .toFixed(0)
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
            GDP
          </span>
          {/*
          <span className="text-xs lg:text-sm">
            {Number(tokenBalanceUSDT?.displayValue).toFixed(2)}{' '}
            {tokenBalanceUSDT?.symbol}
          </span>
          */}
        </div>
      )}
    </div>
  );
}

export function Header() {
  const isMounted = useIsMounted();
  const breakpoint = useBreakpoint();
  const windowScroll = useWindowScroll();
  const { openDrawer, isOpen } = useDrawer();

  const router = useRouter();

  return (
    <nav
      className={cn(
        'sticky top-0 z-30 flex w-full items-center justify-between px-4 transition-all duration-300 ltr:right-0 rtl:left-0 sm:px-6 lg:px-8 3xl:px-10',
        isMounted && windowScroll.y > 10
          ? 'h-24  bg-gradient-to-b from-white to-white/80 shadow-card backdrop-blur dark:from-dark dark:to-dark/80 sm:h-24 '
          : 'h-24 bg-body dark:bg-dark sm:h-24'
      )}
    >
      <div className="mx-auto flex w-full max-w-[2160px] items-center justify-between">
        <div className="flex items-center">
          <div className="hidden lg:mr-6 lg:block xl:hidden">
            <Hamburger
              isOpen={isOpen}
              onClick={() => openDrawer('DRAWER_MENU')}
              color="white"
              className="shadow-main dark:border dark:border-solid dark:border-gray-700 dark:bg-light-dark dark:text-white"
            />
          </div>

          {/*
          <Logo />
          */}

          <button
            className="flex flex-row items-center justify-center gap-2"
            onClick={() => router.push(routes.home)}
          >
            <Image src={logo} alt="logo" width={35} height={35} />
            {/*
            <span className="ml-1 text-lg font-bold">Granderby</span>
            */}
          </button>

          {isMounted && ['xs', 'sm', 'md', 'lg'].indexOf(breakpoint) == -1 && (
            <MenuItems />
          )}
        </div>

        <HeaderRightArea />
      </div>
    </nav>
  );
}

export default function MomoconLayout({
  children,
}: React.PropsWithChildren<{}>) {
  ///console.log('layout MomoconLayout');

  return (
    <>
      <Header />

      <div className="bg-light-100 dark:bg-dark-100 mt-8 flex min-h-screen flex-col gap-6 px-4 sm:px-6 lg:px-8 3xl:px-10">
        <main className="mx-auto mb-12 flex w-full max-w-[2160px] flex-grow flex-col">
          {children}
        </main>
      </div>

      <footer>
        <div className="flex flex-col items-center justify-center gap-3  bg-gray-800 pb-10 pt-20 text-white ">
          {/*
          <div className='flex flex-row gap-5'>
            <div>
              <Image src={LogoMomocon} alt="MOMOCON" width={48} height={48} />
            </div>

            <AnchorLink
              href="https://www.instagram.com/nftgranderby"
              target="_blank"
              className="flex items-center gap-1 rounded-lg bg-gray-100 px-3 pb-1 pt-[6px] text-sm font-medium text-gray-900 dark:bg-gray-700 dark:text-white"
            >
              <Instagram className="h-4 w-4" /> Instagram
            </AnchorLink>

            <AnchorLink
              href="https://twitter.com/nftgranderby"
              target="_blank"
              className="flex items-center gap-1 rounded-lg bg-gray-100 px-3 pb-1 pt-[6px] text-sm font-medium text-gray-900 dark:bg-gray-700 dark:text-white"
            >
              <Twitter className="h-4 w-4" /> Twitter
            </AnchorLink>
          </div>
          */}

          <div className=" flex flex-row items-start justify-center gap-5 xl:gap-20">
            <div className=" flex w-28 flex-col items-center justify-center gap-3 lg:w-44 xl:w-36">
              <span className="mb-2 w-full text-left text-xl font-bold">
                News
              </span>
              <div className="h-7 w-full text-left ">Notice</div>
              <div className="h-7 w-full text-left">Event</div>
              <div className="h-7 w-full text-left">Press Release</div>
            </div>

            <div className="flex w-28 flex-col items-center justify-center gap-3 lg:w-44 xl:w-36">
              <span className="mb-2 w-full text-left text-xl font-bold">
                Legal
              </span>
              <div className="h-7 w-full text-left">
                <AnchorLink href="/terms">Terms of Service</AnchorLink>
              </div>
              <div className="h-7 w-full text-left">Privacy Policy</div>
              <div className="h-7 w-full text-left">Help Center</div>
            </div>

            <div className="flex w-28 flex-col items-center justify-center gap-3 lg:w-44 xl:w-36">
              <span className="mb-2 w-full text-left text-xl font-bold">
                Community
              </span>

              <div className="h-7 w-full">
                <AnchorLink
                  href="https://discord.gg/PZqNeGeR"
                  target="_blank"
                  //className="flex items-center gap-1 rounded-lg bg-gray-100 px-3 pb-1 pt-[6px] text-sm font-medium text-gray-900 dark:bg-gray-700 dark:text-white"
                  className="flex flex-row items-center justify-start gap-2"
                >
                  {/*<Twitter className="h-4 w-4" />*/}
                  <Image
                    src="/images/brands/discord.png"
                    width={18}
                    height={18}
                    alt="discord"
                  />
                  Discord
                </AnchorLink>
              </div>

              <div className="h-7 w-full">
                <AnchorLink
                  href="https://twitter.com/nftgranderby"
                  target="_blank"
                  //className="flex items-center gap-1 rounded-lg bg-gray-100 px-3 pb-1 pt-[6px] text-sm font-medium text-gray-900 dark:bg-gray-700 dark:text-white"
                  className="flex flex-row items-center justify-start gap-2"
                >
                  {/*<Twitter className="h-4 w-4" />*/}
                  <Image
                    src="/images/brands/twitter.png"
                    width={18}
                    height={18}
                    alt="twitter"
                  />
                  Twitter
                </AnchorLink>
              </div>

              <div className="h-7 w-full ">
                <AnchorLink
                  href="https://www.facebook.com/granderby/"
                  target="_blank"
                  //className="flex items-center gap-1 rounded-lg bg-gray-100 px-3 pb-1 pt-[6px] text-sm font-medium text-gray-900 dark:bg-gray-700 dark:text-white"
                  className="flex flex-row items-center justify-start gap-2"
                >
                  {/*
                  <Facebook className="h-4 w-4" />
                  */}
                  <Image
                    src="/images/brands/facebook.png"
                    width={18}
                    height={18}
                    alt="facebook"
                  />
                  Facebook
                </AnchorLink>
              </div>

              <div className="h-7 w-full">
                <AnchorLink
                  href="https://www.instagram.com/nftgranderby"
                  target="_blank"
                  //className="flex items-center gap-1 rounded-lg bg-gray-100 px-3 pb-1 pt-[6px] text-sm font-medium text-gray-900 dark:bg-gray-700 dark:text-white"
                  className="flex flex-row items-center justify-start gap-2"
                >
                  {/*<Instagram className="h-4 w-4" />*/}
                  <Image
                    src="/images/brands/instagram.png"
                    width={18}
                    height={18}
                    alt="instagram"
                  />
                  Instagram
                </AnchorLink>
              </div>

              <div className="h-7 w-full">
                <AnchorLink
                  href="https://www.youtube.com/channel/UCQugbaIcEJxfMs3VYvaTFzw"
                  target="_blank"
                  //className="flex items-center gap-1 rounded-lg bg-gray-100 px-3 pb-1 pt-[6px] text-sm font-medium text-gray-900 dark:bg-gray-700 dark:text-white"
                  className="flex flex-row items-center justify-start gap-2"
                >
                  {/*<Instagram className="h-4 w-4" />*/}
                  <Image
                    src="/images/brands/youtube.png"
                    width={18}
                    height={18}
                    alt="youtube"
                  />
                  Youtube
                </AnchorLink>
              </div>

              <div className="h-7 w-full">
                <AnchorLink
                  href="https://www.twitch.tv/nftgranderby"
                  target="_blank"
                  //className="flex items-center gap-1 rounded-lg bg-gray-100 px-3 pb-1 pt-[6px] text-sm font-medium text-gray-900 dark:bg-gray-700 dark:text-white"
                  className="flex flex-row items-center justify-start gap-2"
                >
                  {/*<Instagram className="h-4 w-4" />*/}
                  <Image
                    src="/images/brands/twitch.png"
                    width={18}
                    height={18}
                    alt="twitch"
                  />
                  Twitch
                </AnchorLink>
              </div>

              <div className="h-7 w-full">
                <AnchorLink
                  href="https://t.me/granderby"
                  target="_blank"
                  //className="flex items-center gap-1 rounded-lg bg-gray-100 px-3 pb-1 pt-[6px] text-sm font-medium text-gray-900 dark:bg-gray-700 dark:text-white"
                  className="flex flex-row items-center justify-start gap-2"
                >
                  {/*<Instagram className="h-4 w-4" />*/}
                  <Image
                    src="/images/brands/telegram.png"
                    width={18}
                    height={18}
                    alt="instagram"
                  />
                  Telegram
                </AnchorLink>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-row gap-5">
            <div>© 2022-2023 MOMOCON SG PTE. LTD. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </>
  );
}
