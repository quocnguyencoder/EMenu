import { useState, useEffect } from 'react'
import Head from 'next/head'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Layout from '../components/Layout'
import theme from '../styles/theme'
import type { AppProps } from 'next/app'
import { AnimatePresence, motion } from 'framer-motion'
import Loader from 'react-loader-spinner'

export default function MyApp({ Component, pageProps, router }: AppProps) {
  const [isRouteChanging, setIsRouteChanging] = useState(false)

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles != null) {
      jssStyles.parentElement?.removeChild(jssStyles)
    }
  }, [])

  useEffect(() => {
    const routeChangeStartHandler = () => setIsRouteChanging(true)

    const routeChangeEndHandler = () => setIsRouteChanging(false)

    router.events.on('routeChangeStart', routeChangeStartHandler)
    router.events.on('routeChangeComplete', routeChangeEndHandler)
    router.events.on('routeChangeError', routeChangeEndHandler)
    return () => {
      router.events.off('routeChangeStart', routeChangeStartHandler)
      router.events.off('routeChangeComplete', routeChangeEndHandler)
      router.events.off('routeChangeError', routeChangeEndHandler)
    }
  }, [])

  return (
    <>
      <Head>
        <title>My page</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <Layout>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          {isRouteChanging ? (
            <motion.div
              initial={{
                opacity: 0,
                height: '90vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
            >
              <Loader type="Circles" color="primary" height={80} width={80} />
            </motion.div>
          ) : (
            <AnimatePresence exitBeforeEnter>
              <Component {...pageProps} key={router.route} />
            </AnimatePresence>
          )}
        </Layout>
      </ThemeProvider>
    </>
  )
}
