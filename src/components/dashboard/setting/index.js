import React from "react";
import { Box, Flex, Button, useToast } from "@chakra-ui/core";
import { PageTitle } from "utils/page-title";
import { TOAST_SUCCESS, TOAST_ERROR } from "utils/misc-helpers";
import { ChangePasswordView } from "./change-password";
import { PublicProfileView } from "./profile";

import { Section, SectionContent } from "../common/section";

import Wrapper from "../common/wrapper";
import SecondaryMenu from "../common/secondary-menu";

/**
 * email
 * change password
 *
 * profile
 * full name
 * signature
 *
 */

// <PageTitle title="Paramèt" />
// <Section name="Change modepas">
//   <ChangePasswordView />
// </Section>

export default function SettingView({ user }) {
  const { email, emailVerified } = user;
  const toast = useToast();
  return (
    <>
      <PageTitle title="Paramèt" />
      {/* <Box width="full" height="8" /> */}
      <SecondaryMenu />

      <Wrapper>
        <>
          <Section name="Enfomasyon pesonel">
            <SectionContent label="Imèl">
              <Box>
                <Box as="span" color="blue.400">
                  {email}.{" "}
                </Box>
                {!emailVerified && (
                  <span>
                    Imèl ou pako verifye.{" "}
                    <Button
                      variantColor="teal"
                      variant="link"
                      onClick={() => {
                        fetch("/api/user/email/verify")
                          .then(() => {
                            toast(TOAST_SUCCESS);
                          })
                          .catch(() => {
                            toast(TOAST_ERROR);
                          });
                      }}
                    >
                      Klike la
                    </Button>{" "}
                    pou voye enstriksyon pou verifikasyon yo.
                  </span>
                )}
              </Box>
            </SectionContent>
          </Section>

          <ChangePasswordView />
        </>

        <PublicProfileView user={user} />
      </Wrapper>
    </>
  );
}
