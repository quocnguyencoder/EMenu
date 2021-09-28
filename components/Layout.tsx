import React from 'react'
import Header from './Header'
import Meta from './Meta'
import Footer from './Footer'
interface Props {
  children: React.ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <>
      <Meta />
      <Header />
      {children}
      <Footer />
    </>
  )
}
