import Head from 'next/head'

interface Props {
  title: string
  description: string
}

export default function Meta({ title, description }: Props) {
  const prefix = process.env.NEXT_PUBLIC_BASE_PATH || ''
  return (
    <Head>
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width"
      />
      <meta charSet="utf-8" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="icon" href={`${prefix}/favicon.ico`} />
    </Head>
  )
}

Meta.defaultProps = {
  title: 'Emenu',
  description: 'Welcome to EMenu',
}
