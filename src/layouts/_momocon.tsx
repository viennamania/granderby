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
import { Check } from '@/components/icons/check';
import { Copy } from '@/components/icons/copy';
import { SearchIcon } from '@/components/icons/search';
import AnchorLink from '@/components/ui/links/anchor-link';

import { ConnectWallet, useAddress } from '@thirdweb-dev/react';

import { darkTheme, lightTheme } from '@thirdweb-dev/react';

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

  return (
    <div className="order-last flex shrink-0 items-center">
      <div className="ltr:mr-3.5 rtl:ml-3.5 ltr:sm:mr-5 rtl:sm:ml-5 xl:hidden">
        {/*
        <SearchButton
          color="white"
          className="shadow-main dark:border dark:border-solid dark:border-gray-700 dark:bg-light-dark dark:text-white"
        />
  */}
      </div>

      <div className="hidden gap-6 lg:flex 2xl:gap-8">
        {isMounted && ['xs', 'sm', 'md', 'lg'].indexOf(breakpoint) == -1 && (
          <div>
            {/*
            <SearchButton variant="transparent" className="dark:text-white" />
        */}
          </div>
        )}

        {/*
        <NotificationButton />
      */}

        {/*
        <WalletConnect />
        */}

        {address ? (
          <ConnectWallet theme="dark" />
        ) : (
          <ConnectWallet
            theme={lightTheme({
              fontFamily: 'Inter, sans-serif',
              colors: {
                //modalBg: "#000000",
                modalBg: '#ffffff',
                accentText: 'green',
                // ... etc
              },
            })}
            btnTitle="Login"
          />
        )}
      </div>

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
          ? 'h-16 bg-gradient-to-b from-white to-white/80 shadow-card backdrop-blur dark:from-dark dark:to-dark/80 sm:h-20'
          : 'h-16 bg-body dark:bg-dark sm:h-24'
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
            <Image src={logo} alt="logo" width={30} height={30} />
            <span className="ml-1 text-lg font-bold">Granderby</span>
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
        <div className=" flex-cols flex items-center justify-center gap-3 bg-gray-800 pt-20 text-white ">
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

        <div className=" flex-cols flex items-center justify-center gap-3 bg-gray-800 pb-10 pt-10 text-white ">
          <div>Copyright ©MOMOCON SG PTE. LTD.</div>

          <AnchorLink href="/terms">Terms of Service</AnchorLink>

          <div>Privacy Policy</div>
        </div>
      </footer>
    </>
  );
}
