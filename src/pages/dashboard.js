import React, { useState, useEffect } from "react";
import Head from "next/head";
// import Router from "next/router";
import dynamic from "next/dynamic";
import { FullPageLoading } from "components";

const ClientOnly = dynamic({
  loader: () => import("components/dashboard"),
  loading: FullPageLoading,
  ssr: false,
});

// function redirectOnNotAuthenticated() {}

export default () => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // check if the user is authenticated
    // if not redirect to login
    setTimeout(() => {
      setReady(true);
    }, 5000);
  }, []);

  if (!ready) {
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
      </Head>
      <ClientOnly />
    </>
  );
};
