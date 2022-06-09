import Head from 'next/head'
import { DefaultSeo } from 'next-seo'

export default function Meta() {
  const prefix = process.env.NEXT_PUBLIC_BASE_PATH || ''
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <meta charSet="utf-8" />
        <link rel="icon" href={`${prefix}/favicon.ico`} />
      </Head>
      <DefaultSeo
        titleTemplate="EMenu - %s"
        defaultTitle="EMenu"
        openGraph={{
          type: 'website',
          locale: 'vi_VN',
          url: 'https://emenu-green.vercel.app/',
          site_name: 'Emenu',
        }}
        twitter={{
          handle: '@handle',
          site: '@site',
          cardType: 'summary_large_image',
        }}
      />
    </>
  )
}
