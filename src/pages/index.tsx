import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import type { NextPageWithLayout } from '@/types';
import RootLayout from '@/layouts/_root-layout';
import { useLayout } from '@/lib/hooks/use-layout';
import { LAYOUT_OPTIONS } from '@/lib/constants';
import ModernScreen from '@/components/screens/modern-screen';
import MinimalScreen from '@/components/screens/minimal-screen';
import ClassicScreen from '@/components/screens/classic-screen';
import RetroScreen from '@/components/screens/retro-screen';
import MomoconScreen from '@/components/screens/momocon-screen';

import Head from 'next/head';

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      title: 'Granderby - Home',
      description: 'powered by MOMOCON',
      image: '/intro-bg.png',
    },
  };
};

const HomePage: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = (props) => {
  const { title, image, description } = props;

  const { layout } = useLayout();

  // render morden screen/page
  if (layout === LAYOUT_OPTIONS.MODERN) {
    return (
      <>
        <Head>
          <meta property="og:title" content={title}></meta>
          <meta property="og:description" content={description}></meta>
          <meta property="og:image" content={image}></meta>

          <meta name="twitter:image" content={image}></meta>

          <title>{title}</title>
        </Head>
        <ModernScreen />
      </>
    );
  }

  // render minimal screen/page
  if (layout === LAYOUT_OPTIONS.MINIMAL) {
    return <MinimalScreen />;
  }

  // render classic screen/page
  if (layout === LAYOUT_OPTIONS.CLASSIC) {
    return <ClassicScreen />;
  }

  // render retro screen/page
  if (layout === LAYOUT_OPTIONS.RETRO) {
    return <RetroScreen />;
  }

  // render retro screen/page
  if (layout === LAYOUT_OPTIONS.MOMOCON) {
    return (
      <>
        <Head>
          <meta property="og:title" content={title}></meta>
          <meta property="og:description" content={description}></meta>
          <meta property="og:image" content={image}></meta>

          <meta name="twitter:image" content={image}></meta>

          <title>{title}</title>
        </Head>
        <MomoconScreen />
      </>
    );
  }

  // render default screen/page which is modern
  ///return <ModernScreen />;

  // render default screen/page which is minimal
  //return <MinimalScreen />;

  // render default screen/page which is momocon
  return (
    <>
      <Head>
        <meta property="og:title" content={title}></meta>
        <meta property="og:description" content={description}></meta>
        <meta property="og:image" content={image}></meta>

        <meta name="twitter:image" content={image}></meta>

        <title>{title}</title>
      </Head>
      <MomoconScreen />
    </>
  );
};

HomePage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

export default HomePage;
