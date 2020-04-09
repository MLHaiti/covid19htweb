import React, { useRef, useState } from "react";
import {
  Box,
  FormHelperText,
  Text,
  FormControl,
  Input,
  FormLabel,
  Button,
  Flex,
  Stack,
  Badge,
  Tag,
  TagIcon,
  TagLabel,
  useToast,
} from "@chakra-ui/core";
import useSWR from "swr";
import fetch from "utils/fetch";
import { FullDiv, AugmentChildren } from "components/brics";
import {
  managerialRoles,
  userRolesKeyText,
  findTransferableRoles,
} from "utils/user-helpers";
import { TOAST_ERROR, TOAST_SUCCESS } from "utils/misc-helpers";
import { Section, SectionContent } from "../common/section";

export const ManageUserRole = () => {
  console.log("go");
  const emailRef = useRef(null);
  const [email, setEmail] = useState("");
  const [isActive, setActive] = useState(false);

  const { data } = useSWR(
    () => (isActive ? `/api/user/status?email=${email}` : ""),
    fetch
  );
  const user = data ? data.user : null;

  const submit = (e) => {
    e.preventDefault();
    if (isActive) {
      setActive(false);
      emailRef.current.value = "";
      setEmail("");
    } else {
      setActive(true);
      setEmail(emailRef.current.value);
    }
  };

  const updateRoles = async (roles, email) =>
    fetch("/api/user/status", {
      method: "PATCH",
      body: JSON.stringify({
        data: roles,
        action: "updateRoles",
        userEmail: email,
      }),
    })
      .then(() => true)
      .catch(() => false);

  return (
    <Section name="Jere wòl itilizatè yo">
      <Box marginX="2" marginY="4">
        <Box as="form" onSubmit={submit}>
          <FormControl>
            <FormLabel htmlFor="email">Antre email itilizatè a</FormLabel>
            <Flex
              flexDir={{
                base: "column",
                lg: "row",
              }}
            >
              {/*  */}
              <Box width="300px" mr="4">
                <Input
                  isRequired
                  type="email"
                  id="email"
                  aria-describedby="email-helper-text"
                  ref={emailRef}
                  isDisabled={isActive}
                />
                <FormHelperText id="email-helper-text">
                  Imèl itilizatè a.
                </FormHelperText>
              </Box>
              {/*  */}
              <Button type="submit" variantColor={isActive ? "red" : "green"}>
                {isActive ? "Resèt" : "Chache"}
              </Button>
              {/*  */}
            </Flex>
          </FormControl>
        </Box>

        {user && <UserRole {...user} updateRoles={updateRoles} />}
      </Box>
    </Section>
  );
};

const UserRole = ({
  email,
  emailVerified,
  firstName,
  lastName,
  signature,
  roles: activeRoles,
  updateRoles,
}) => {
  const toast = useToast();
  const [isSaving, setIsSaving] = useState(false);
  const [roles, setRoles] = useState(activeRoles || []);

  const { data: currentUser } = useSWR("userState");
  const transferableRoles = findTransferableRoles(
    currentUser.isAdmin,
    currentUser.roles
  );

  const selection = transferableRoles.filter((v) => !roles.includes(v));

  const updateInformation = async () => {
    setIsSaving(true);
    updateRoles(roles, email).then((ok) => {
      if (ok) {
        toast(TOAST_SUCCESS);
      } else {
        toast(TOAST_ERROR);
      }
      setIsSaving(false);
    });
  };

  return (
    <>
      <Box as="hr" marginY="4" />
      <AugmentChildren labelWidth={120}>
        <SectionContent label="Imèl">
          <Box>
            <Stack isInline>
              <Text marginRight="2">{email}</Text>
              <Box>
                {emailVerified ? (
                  <Badge variantColor="green">Verify</Badge>
                ) : (
                  <Badge variantColor="purple">Poko verifye</Badge>
                )}
              </Box>
            </Stack>
            {emailVerified ? null : (
              <Text fontSize="sm" color="red.400">
                Itilizatè dwe verifye imèl li avan li ka pibliye konteni.
              </Text>
            )}
          </Box>
        </SectionContent>
        <SectionContent label="Prenon">
          <Box>{firstName}</Box>
        </SectionContent>
        <SectionContent label="Non fanmi">
          <Box>{lastName}</Box>
        </SectionContent>
        <SectionContent label="Siyati">
          <Box>{signature}</Box>
        </SectionContent>
        <SectionContent label="Wòl">
          <FullDiv mb="4">
            {roles.length > 0 ? (
              <>
                <Text fontSize="sm" mb="2">
                  Klike pou retire wòl pou itilizatè a
                </Text>
                <FullDiv>
                  {(roles || []).map((el) => (
                    <Tag
                      size="md"
                      key={`role-current-${el}`}
                      variant="solid"
                      variantColor="orange"
                      marginRight="4"
                      marginBottom="4"
                      role="button"
                      // as="button"
                      onClick={() => {
                        if (!isSaving && transferableRoles.includes(el)) {
                          setRoles(roles.filter((c) => c !== el));
                        }
                      }}
                    >
                      <TagLabel>{userRolesKeyText[el]}</TagLabel>
                      {/* <TagCloseButton /> */}
                      {managerialRoles.includes(el) ? (
                        <TagIcon icon="star" size="12px" />
                      ) : null}
                    </Tag>
                  ))}
                </FullDiv>
              </>
            ) : null}
            {selection.length > 0 ? (
              <>
                <Text fontSize="sm" mb="2">
                  Klike pou ajoute wòl pou itilizatè a
                </Text>
                <FullDiv>
                  {selection.map((el) => (
                    <Tag
                      size="md"
                      key={`role-trans-${el}`}
                      variant="solid"
                      variantColor="green"
                      marginRight="4"
                      marginBottom="4"
                      role="button"
                      // as="button"
                      onClick={() => {
                        if (!isSaving) {
                          setRoles([...roles, el]);
                        }
                      }}
                    >
                      {/* <TagIcon icon="add" size="12px" /> */}
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
        </SectionContent>
        <SectionContent label="">
          <Flex direction="row" alignItems="center">
            <Button
              isLoading={isSaving}
              loadingText="Tan yon moman"
              variantColor="teal"
              variant="outline"
              isDisabled={isSaving}
              onClick={updateInformation}
            >
              Anrejistre
            </Button>
          </Flex>
        </SectionContent>
      </AugmentChildren>
    </>
  );
};
