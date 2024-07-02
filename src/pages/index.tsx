import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import type { NextPageWithLayout } from '@/types';
import RootLayout from '@/layouts/_root-layout';
import { useLayout } from '@/lib/hooks/use-layout';
import { LAYOUT_OPTIONS } from '@/lib/constants';

import ModernScreen from '@/components/screens/modern-screen';

/*
import MinimalScreen from '@/components/screens/minimal-screen';
import ClassicScreen from '@/components/screens/classic-screen';
import RetroScreen from '@/components/screens/retro-screen';
import MomoconScreen from '@/components/screens/momocon-screen';
*/

import Head from 'next/head';

export const getStaticProps: GetStaticProps = async () => {
  const pageid = 'home';
  const title = 'Granderby - Home';
  const description = 'powered by MOMOCON';

  return {
    props: {
      pageid: pageid,
      title: title,
      description: description,
    },
  };
};

const HomePage: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = (props) => {
  const { title, image, description } = props;

  const { layout } = useLayout();

  // render default screen/page which is momocon
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1 maximum-scale=1"
        />
        <meta property="og:type" content="website"></meta>

        <meta property="og:site_name" content="GRANDERBY"></meta>
        <meta name="twitter:card" content="summary_large_image"></meta>

        <meta property="og:image:width" content="1400"></meta>
        <meta property="og:image:height" content="1400"></meta>

        <meta property="og:title" content={title}></meta>
        <meta property="og:description" content={description}></meta>
        <meta property="og:image" content={image}></meta>

        <meta name="twitter:image" content={image}></meta>

        <title>{title}</title>
      </Head>

      <ModernScreen />

      {/* Under construction page
        Sorry for the inconvenience, we are currently under construction. Please check back later.
      */}

      {/*
      <div className="flex flex-col gap-10 justify-center items-center h-screen">
        <h1 className="text-4xl font-bold">Under Construction</h1>
        <h3 className="text-2xl font-bold">
          Sorry for the inconvenience, we are currently under construction.
          Please check back later.
        </h3>
      </div>
      */}
    </>
  );
};

HomePage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

export default HomePage;
