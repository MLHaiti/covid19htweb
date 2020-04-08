/** eslint-disable  */
import React, { useState } from "react";
import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  Icon,
  useToast,
  Button,
  InputRightElement,
  Text,
} from "@chakra-ui/core";
import { useForm } from "react-hook-form";
import fetch from "utils/fetch";
import {
  FormSection,
  FormSectionContent,
  SectionContent,
} from "../common/section";

export function ChangePasswordView() {
  const {
    handleSubmit,
    errors,
    register,
    getValues,
    setValue,
    formState,
  } = useForm();
  const [viewPass, setViewPass] = useState(false);
  const [failed, setFailed] = useState("");
  const toast = useToast();

  const toggleView = () => {
    setViewPass(!viewPass);
  };

  function onSubmit(values) {
    const { password, newPassword } = values;

    return fetch("/api/user/password/update", {
      method: "PATCH",
      body: JSON.stringify({
        newPassword,
        password,
      }),
    })
      .then((r) => {
        setValue([
          { password: "" },
          { newPassword: "" },
          { newPasswordConf: "" },
        ]);
        toast({
          title: "Siksè",
          description: "Modepas la change",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      })
      .catch(async (error) => {
        // TODO Automatically logout the user after 3 unsuccessful attempt
        const data = await error.response.json();
        const { message } = data;

        const invalidPassword = message === "Invalid credentials";

        if (invalidPassword) {
          setFailed(
            invalidPassword
              ? "Modepas aktyèl ou mete a enkòrèk."
              : "Tanpri eseye ankò."
          );
        }
        toast({
          title: "Echèk",
          description: "Modepas la pa change",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      });
  }

  return (
    <>
      <FormSection name="Change modepas" onSubmit={handleSubmit(onSubmit)}>
        <Box>
          <SectionContent label="" labelWidth={140}>
            {failed && <Text color="red.900">{failed}</Text>}
          </SectionContent>
        </Box>
        <FormSectionContent
          label="Modepas aktyèl"
          htmlFor="password"
          alignRight
          labelWidth={140}
        >
          <InputGroup width="full">
            <InputLeftElement>
              <Icon name="lock" color="gray.300" />
            </InputLeftElement>
            <Input
              type={viewPass ? "text" : "password"}
              name="password"
              id="password"
              autoComplete="current-password"
              placeholder="Mete modepas ou"
              isRequired
              width="full"
              size="md"
              ref={register({ required: true, min: 6 })}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={toggleView}>
                {viewPass ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormSectionContent>
        <FormSectionContent
          label="Nouvo modepas"
          htmlFor="newPassword"
          alignRight
          labelWidth={140}
        >
          <Box width="full">
            <InputGroup width="full">
              <InputLeftElement>
                <Icon name="lock" color="gray.300" />
              </InputLeftElement>
              <Input
                type={viewPass ? "text" : "password"}
                name="newPassword"
                id="newPassword"
                autoComplete="new-password"
                placeholder="Mete nouvo modepass la"
                isRequired
                width="full"
                size="md"
                ref={register({
                  required: true,
                  validate: (value) => value.length > 5,
                })}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={toggleView}>
                  {viewPass ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
            {errors.newPassword ? (
              <Text color="red.500" fontSize="sm" marginBottom="2">
                Modepas la obligatwa e li dwe gen pou pi pitit 6 chif ak lèt.
              </Text>
            ) : null}
          </Box>
        </FormSectionContent>
        <FormSectionContent
          label="Antre li ankò"
          htmlFor="newPasswordConf"
          alignRight
          labelWidth={140}
        >
          <Box width="full">
            <InputGroup width="full">
              <InputLeftElement>
                <Icon name="lock" color="gray.300" />
              </InputLeftElement>
              <Input
                type={viewPass ? "text" : "password"}
                name="newPasswordConf"
                id="newPasswordConf"
                autoComplete="new-password"
                placeholder="Mete nouvo modepas ankò"
                isRequired
                width="full"
                size="md"
                ref={register({
                  required: true,
                  validate: (value) => value === getValues().newPassword,
                })}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={toggleView}>
                  {viewPass ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
            {errors.newPasswordConf ? (
              <Text color="red.500" fontSize="sm" marginBottom="2">
                2 Modepas yo pa dwe diferan.
              </Text>
            ) : null}
          </Box>
        </FormSectionContent>
        <Box>
          <SectionContent label="" labelWidth={140}>
            <Button
              type="submit"
              variantColor="green"
              isLoading={formState.isSubmitting}
              isDisabled={formState.isSubmitting}
              loadingText="Nap change modepas la."
            >
              Change modepas la.
            </Button>
          </SectionContent>
        </Box>
      </FormSection>
    </>
  );
}
