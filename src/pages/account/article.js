import React from "react";
import Head from "next/head";

import { AccountLayout } from "components/account/layout";
import { ArticleView } from "components/account/article";
import { PageSpinner } from "components/loading";
import { useUser } from "utils/hooks";

export default () => {
  const user = useUser();

  if (!user) {
    return (
      <>
        <Head>
          <title>Account</title>
        </Head>
        <PageSpinner />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Account</title>
      </Head>
      <AccountLayout>
        <ArticleView />
      </AccountLayout>
    </>
  );
};
