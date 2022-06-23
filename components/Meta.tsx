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
        <link
          rel="apple-touch-icon"
          href="apple-touch-icons/apple-touch-icon.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="apple-touch-icons/apple-touch-icon-57x57.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="apple-touch-icons/apple-touch-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="apple-touch-icons/apple-touch-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="apple-touch-icons/apple-touch-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="apple-touch-icons/apple-touch-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="apple-touch-icons/apple-touch-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="apple-touch-icons/apple-touch-icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="apple-touch-icons/apple-touch-icon-180x180.png"
        />
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
