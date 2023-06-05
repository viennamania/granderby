import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';

class CustomDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    return Document.getInitialProps(ctx);
  }

  render() {
    return (
      <Html lang="en-US" dir="ltr" className="light">
        <Head>
          {/*
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500&display=swap"
            rel="stylesheet"
          />
    */}
          <meta
            httpEquiv="Content-Security-Policy"
            content="upgrade-insecure-requests"
          />
        </Head>

        <body>
          <Main />
          <NextScript />

          <script src="/js/jquery-latest.js"></script>
          <script src="/js/swiper.min.js"></script>
          <script src="/js/aos.min.js"></script>

          <script src="/js/gsap.min.js"></script>
          <script src="/js/ScrollTrigger.min.js"></script>
          <script src="/js/common.js"></script>
          <script src="https://cdn.rawgit.com/wilddeer/stickyfill/master/dist/stickyfill.min.js"></script>
        </body>
      </Html>
    );
  }
}

export default CustomDocument;
