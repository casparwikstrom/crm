import { ThemeProvider } from 'next-themes';
import LayoutWrapper from '@/components/LayoutWrapper';
import siteMetadata from '@/data/siteMetadata';
import '@/css/tailwind.css';
import '@/css/prism.css';
import 'katex/dist/katex.css';
import '@fontsource/inter/variable-full.css';
import Head from 'next/head';
import { ClientReload } from '@/components/ClientReload';
import { appWithTranslation } from 'next-i18next';
import nextI18NextConfig from '../next-i18next.config.js';

const isDevelopment = process.env.NODE_ENV === 'development'
const isSocket = process.env.SOCKET

function CustomApp({ Component, pageProps }) {
  const { metaData } = pageProps;
  
  return (
    <ThemeProvider attribute="class" defaultTheme={siteMetadata.theme}>
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta name="ahrefs-site-verification" content={metaData.ahrefs} />
      </Head>
      {isDevelopment && isSocket && <ClientReload />}
      <LayoutWrapper metaData={metaData}>
        <Component {...pageProps} metaData={metaData} />
        {/* <Analytics /> */}
      </LayoutWrapper>
    </ThemeProvider>
  );
}

CustomApp.getInitialProps = async (appContext) => {
  const { ctx } = appContext;
  const domain = process.env.DOMAIN_URL;
  const res = await fetch(`https://you-b.herokuapp.com/api/v1/dsettings?domain=${domain}`);
  //const res = await fetch(`http://localhost:3001/api/v1/dsettings?domain=${domain}`);
  const metaData = await res.json();

  const pageProps = ctx.Component && ctx.Component.getInitialProps
    ? await ctx.Component.getInitialProps(ctx)
    : {};
  
  return { pageProps: { ...pageProps, metaData } };
};

export default appWithTranslation(CustomApp, nextI18NextConfig);