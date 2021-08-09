import React from "react";
import Header from "./Header";
import Meta from "./Meta";
interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  const prefix = process.env.NEXT_PUBLIC_BASE_PATH || "";

  return (
    <>
      <Meta />
      <Header />
      {children}
    </>
  );
}
