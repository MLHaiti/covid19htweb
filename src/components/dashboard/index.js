import React from "react";
import Head from "next/head";
import { FullPageLoading } from "components";
import { useUser } from "utils/hooks";

import useSWR from "swr";
import { DashboardLayout } from "./layout";

import { sideMenuStore } from "./store";
import SettingView from "./setting";
import ArticleView from "./article";
import BulletinView from "./bulleting";

export default () => {
  const { data } = useSWR("sideMenuState", {
    initialData: sideMenuStore,
  });

  const user = useUser();

  const { active } = data;

  return (
    <>
      <Head>
        <title>Board</title>
      </Head>
      {user ? (
        <DashboardLayout>
          {active === "setting" ? <SettingView user={user} /> : null}
          {active === "article" ? <ArticleView user={user} /> : null}
          {active === "bulletin" ? <BulletinView user={user} /> : null}
        </DashboardLayout>
      ) : (
        <FullPageLoading />
      )}
    </>
  );
};
