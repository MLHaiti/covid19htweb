import React from "react";

import Wrapper from "../common/wrapper";
import SecondaryMenu from "../common/secondary-menu";

import { ManageUserRole } from "./user-role";

export default function ManagementView() {
  return (
    <>
      <SecondaryMenu />

      <Wrapper>
        <ManageUserRole />
      </Wrapper>
    </>
  );
}
