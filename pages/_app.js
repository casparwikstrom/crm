import '@/css/tailwind.css'
import '@/css/prism.css'
import 'katex/dist/katex.css'

import '@fontsource/inter/variable-full.css'

import { ThemeProvider } from 'next-themes'
import Head from 'next/head'

import siteMetadata from '@/data/siteMetadata'
import Analytics from '@/components/analytics'
import LayoutWrapper from '@/components/LayoutWrapper'
import { ClientReload } from '@/components/ClientReload'


const isDevelopment = process.env.NODE_ENV === 'development'
const isSocket = process.env.SOCKET

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class" defaultTheme={siteMetadata.theme}>
      <Head>
        
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta name="ahrefs-site-verification" content="7a427c46c8950ff0b30305ca900d1f016dfedfad242545b7a0bb6f6308b66406"/>

        {/* <meta
          http-equiv="Content-Security-Policy"
          content="script-src 'self' http://www.youtube.com"
        /> */}
      </Head>
      {isDevelopment && isSocket && <ClientReload />}
      <LayoutWrapper>


        <Component {...pageProps} />
        <Analytics/>
      </LayoutWrapper>
    </ThemeProvider>
  )
}
