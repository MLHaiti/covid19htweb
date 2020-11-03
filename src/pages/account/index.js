import React from "react";
import Head from "next/head";
import { AccountLayout } from "components/account/layout";

import { SettingView } from "components/account/setting";
import { PageSpinner } from "components/loading";
import { useUser } from "utils/hooks";

function Page() {
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
        <SettingView user={user} />
      </AccountLayout>
    </>
  );
}

export default Page;
