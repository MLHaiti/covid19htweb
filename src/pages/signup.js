import React, { useState } from "react";
import { PageTitle } from "utils/page-title";
import Router from "next/router";
import NextLink from "next/link";
import { useForm } from "react-hook-form";
import {
  Flex,
  Box,
  Heading,
  Input,
  Button,
  Link,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Icon,
  Text,
  useToast,
} from "@chakra-ui/core";
import fetch from "utils/fetch";

import { AuthLayout } from "components";

const Signup = () => {
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
    const { email, password } = values;
    setFailed("");
    return fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((r) => {
        setValue([{ email: "" }, { password: "" }, { passwordConf: "" }]);
        toast({
          title: "Kont la kreye",
          description: "kounye a ou ka konekte",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        // TODO ADD EMAIL VERIFICATION and update messager for that
        setTimeout(() => {
          Router.push("/login");
        }, 2000);
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
          title: "Kont la kreye",
          description: exist
            ? existMesssage
            : "Tanpri verifye entènèt ou e eseye ankò. Si erè kontinye ekri yon adminstratè",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      });
  }

  return (
    <>
      <PageTitle title="Kreye yon kont" />
      <AuthLayout>
        <Box
          backgroundColor="white"
          width="100%"
          paddingX="6"
          maxWidth={{ md: "500px", lg: "400px" }}
        >
          <Heading as="h1" size="xl" paddingY="4" textAlign="center">
            Kreye yon kont.
          </Heading>

          {failed && <Text color="red.900">{failed}</Text>}

          <Box as="form" mt="2" onSubmit={handleSubmit(onSubmit)}>
            <InputGroup width="full" marginBottom={{ base: "4", md: "8" }}>
              <InputLeftElement>
                <Icon name="email" color="gray.300" />
              </InputLeftElement>
              <Input
                type="email"
                name="email"
                aria-label="Email address"
                placeholder="Email"
                autoComplete="email"
                isRequired
                size="md"
                ref={register({
                  required: true,
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "invalid email address",
                  },
                })}
              />
            </InputGroup>
            <InputGroup width="full" marginBottom={{ base: "4", md: "8" }}>
              <InputLeftElement>
                <Icon name="lock" color="gray.300" />
              </InputLeftElement>
              <Input
                type={viewPass ? "text" : "password"}
                name="password"
                autoComplete="new-password"
                aria-label="Modepas"
                placeholder="Modepas"
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
            <InputGroup>
              <InputLeftElement>
                <Icon name="lock" color="gray.300" />
              </InputLeftElement>
              <Input
                type={viewPass ? "text" : "password"}
                name="passwordConf"
                autoComplete="new-password"
                isRequired
                aria-label="Konfime modepas"
                placeholder="Konfime modepas"
                ref={register({
                  required: true,
                  validate: (value) => value === getValues().password,
                })}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={toggleView}>
                  {viewPass ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
            {errors.passwordConf ? (
              <Box
                color="red"
                fontSize="sm"
                marginBottom={{ base: "4", md: "8" }}
              >
                Modepas yo pa dwe diferan.
              </Box>
            ) : (
              <Box marginBottom={{ base: "4", md: "8" }} />
            )}
            <Button
              type="submit"
              width="full"
              variantColor="teal"
              variant="solid"
              my="4"
              isDisabled={formState.isSubmitting}
            >
              Kreye kont
            </Button>
          </Box>

          <Flex direction="row" justifyContent="space-between" as="p" my="4">
            <NextLink href="/login" passHref>
              <Link color="#3182C2">Konekte</Link>
            </NextLink>
            <NextLink href="/" passHref>
              <Link color="#3182C2">Akèy</Link>
            </NextLink>
          </Flex>
        </Box>
      </AuthLayout>
    </>
  );
};

export default Signup;
