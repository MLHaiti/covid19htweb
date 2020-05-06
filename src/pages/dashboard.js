import React, { useEffect, useState } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import { FullPageLoading } from "components";

const ClientOnly = dynamic({
  loader: () => import("components/dashboard"),
  loading: FullPageLoading,
  // ssr: false,
});

export default () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <>
        <Head>
          <title>Dashboard</title>
        </Head>
        <FullPageLoading />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Dashboard</title>
        <link rel="stylesheet" href="/css/uppy-dashboard.css" />
        <link rel="stylesheet" href="/css/uppy-webcam.css" />
      </Head>
      <ClientOnly />
    </>
  );
};
