import React from "react";
import { Box, Tag, TagIcon, TagLabel, Button, useToast } from "@chakra-ui/core";
import { TOAST_SUCCESS, TOAST_ERROR } from "utils/misc-helpers";
import useSWR from "swr";
import { FullDiv } from "components/brics";
import { managerialRoles, userRolesKeyText } from "utils/user-helpers";

import { Section, Content } from "../common/section";

export const PrivateInformation = () => {
  const toast = useToast();
  const { data: user } = useSWR("userState", { initialData: {} });
  const { email, emailVerified, roles } = user;

  return (
    <Section name="Enfomasyon pesonel">
      <Content label="Imèl">
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
      </Content>
      <Content label="Wòl">
        <Box>
          <FullDiv>
            {roles.length > 0 ? (
              <>
                <FullDiv>
                  {(roles || []).map((el) => (
                    <Tag
                      size="md"
                      key={`role-current-${el}`}
                      variant="solid"
                      variantColor="purple"
                      marginRight="4"
                      marginBottom="4"
                      role="button"
                    >
                      <TagLabel>{userRolesKeyText[el]}</TagLabel>
                      {managerialRoles.includes(el) ? (
                        <TagIcon icon="star" size="12px" />
                      ) : null}
                    </Tag>
                  ))}
                </FullDiv>
              </>
            ) : null}
          </FullDiv>
        </Box>
      </Content>
    </Section>
  );
};
