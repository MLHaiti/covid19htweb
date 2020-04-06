import React, { useState } from "react";
import Head from "next/head";
import Router, { useRouter } from "next/router";
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
  Icon,
  Text,
  InputRightElement,
  useToast,
} from "@chakra-ui/core";
import fetch from "utils/fetch";
import { AuthLayout } from "components";

const Login = () => {
  const { handleSubmit, errors, register, setValue, formState } = useForm();
  const [viewPass, setViewPass] = useState(false);
  const [failed, setFailed] = useState("");
  const toast = useToast();
  const { query } = useRouter();

  const toggleView = () => {
    setViewPass(!viewPass);
  };
  function onSubmit(values) {
    const { email, password } = values;
    setFailed("");
    return fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((r) => {
        setValue([{ email: "" }, { password: "" }]);
        toast({
          title: "Ou konekte",
          description: "Nap voye ou nan dachbòd la",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        setTimeout(() => {
          if (query.redirect) {
            Router.push(query.redirect);
          } else {
            Router.push("/dashboard");
          }
        }, 2000);
      })
      .catch(async (error) => {
        const data = await error.response.json();
        const { message } = data;

        if (message === "User not found") {
          setFailed(
            "Pa gen kont ak imèl sa. Verifye imèl la oubyen kreye yon kont"
          );
        } else if (message === "Auth Failed") {
          setFailed("Tanpri verifye imèl ak modepas ou");
        } else {
          setFailed("Nou pa rive konekte ou, tanpri eseye ankò");
        }
      });
  }

  return (
    <>
      <Head>
        <title>Konekte</title>
      </Head>

      <AuthLayout>
        <Box
          backgroundColor="white"
          width="100%"
          paddingX="6"
          maxWidth={{ md: "500px", lg: "400px" }}
        >
          <Heading as="h1" size="xl" paddingY="4" textAlign="center">
            Konekte.
          </Heading>
          {failed && (
            <Text fontSize="sm" fontWeight="bold" color="red.900">
              {failed}
            </Text>
          )}
          <Box as="form" mt="2" onSubmit={handleSubmit(onSubmit)}>
            <InputGroup width="full" marginBottom={{ base: "4", md: "8" }}>
              <InputLeftElement>
                <Icon name="email" color="gray.300" />
              </InputLeftElement>
              <Input
                type="email"
                name="email"
                autoComplete="email"
                aria-label="Email address"
                placeholder="Email"
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
                autoComplete="current-password"
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

            <Button
              type="submit"
              width="full"
              variantColor="teal"
              variant="solid"
              my="4"
              isDisabled={formState.isSubmitting}
              isLoading={formState.isSubmitting}
              loadingText="Tan yon moman."
            >
              Konekte
            </Button>
          </Box>

          <Flex direction="row" justifyContent="space-between" as="p" my="4">
            <NextLink href="/reset-password" passHref>
              <Link color="#3182C2">Mwen bliye modepas la</Link>
            </NextLink>
            <NextLink href="/signup" passHref>
              <Link color="#3182C2">Kreye kont</Link>
            </NextLink>
          </Flex>

          <Text textAlign="left" width="100%">
            <NextLink href="/" passHref>
              <Link color="#3182C2">Akèy</Link>
            </NextLink>
          </Text>
        </Box>
      </AuthLayout>
    </>
  );
};

export default Login;
