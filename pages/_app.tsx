import { useEffect } from 'react'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Layout from '../components/Layout'
import theme from '../styles/theme'
import type { AppProps } from 'next/app'
import '@/styles/styles.css'

export default function MyApp({ Component, pageProps, router }: AppProps) {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles != null) {
      jssStyles.parentElement?.removeChild(jssStyles)
    }
  }, [])

  return (
    <>
      <ThemeProvider theme={theme}>
        <Layout>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Component {...pageProps} key={router.route} />
        </Layout>
      </ThemeProvider>
    </>
  )
}
