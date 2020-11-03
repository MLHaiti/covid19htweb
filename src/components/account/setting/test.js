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

    return fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        newPassword,
        password,
      }),
    })
      .then(() => {
        setValue([
          { password: "" },
          { passwordConf: "" },
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
        const data = await error.response.json();
        const { message } = data;
        const exist = message === "An account with that email already exist.";
        const existMesssage =
          "Kont sa egziste deja. Si ou bliye modepas ou ale nan konekte pou risèt li";
        if (exist) {
          setFailed(existMesssage);
        }
        toast({
          title: "Echèk",
          description: "Modepas la pa change",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      });
  }

  return (
    <>
      {failed && <Text color="red.900">{failed}</Text>}
      <FormSection name="Change modepas" onSubmit={handleSubmit(onSubmit)}>
        <FormSectionContent label="Aktyèl" htmlFor="password">
          <InputGroup width="full">
            <InputLeftElement>
              <Icon name="lock" color="gray.300" />
            </InputLeftElement>
            <Input
              type={viewPass ? "text" : "password"}
              name="password"
              id="password"
              autoComplete="current-password"
              placeholder="Mete modepas ou genyen kounye a"
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
        <FormSectionContent label="Nouvo modepas" htmlFor="newPassword">
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
                placeholder="Mete nouvo modepas ou vle a"
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
        <FormSectionContent label="Antre li ankò" htmlFor="newPasswordConf">
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
                placeholder="Mete ankò nouvo modepas ou vle a"
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
          <SectionContent label="">
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
