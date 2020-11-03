import React from "react";
import { PageTitle } from "utils/page-title";
import { ChangePasswordView } from "./ChangePassword";
import { PublicProfileView } from "./Profile";
import { PrivateInformation } from "./PrivateInformation";

import Wrapper from "../common/wrapper";
// import SecondaryMenu from "../common/secondary-menu";

export function SettingView() {
  return (
    <>
      <PageTitle title="Paramèt" />
      {/* <Box width="full" height="8" /> */}
      {/* <SecondaryMenu /> */}

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
