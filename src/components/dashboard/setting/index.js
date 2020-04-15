import React from "react";
import { PageTitle } from "utils/page-title";
import { ChangePasswordView } from "./change-password";
import { PublicProfileView } from "./profile";
import { PrivateInformation } from "./private-information";

import Wrapper from "../common/wrapper";
import SecondaryMenu from "../common/secondary-menu";

export default function SettingView() {
  return (
    <>
      <PageTitle title="Paramèt" />
      {/* <Box width="full" height="8" /> */}
      <SecondaryMenu />

      <Wrapper>
        <>
          <PrivateInformation />

          <ChangePasswordView />
        </>

        <PublicProfileView />
      </Wrapper>
    </>
  );
}
