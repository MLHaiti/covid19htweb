import React, { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
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
  FormControl,
  FormLabel,
  FormHelperText,
} from "@chakra-ui/core";

import { AuthLayout } from "components";

const ResetPassword = () => {
  const { handleSubmit, errors, register, formState, watch } = useForm();
  const [viewPass, setViewPass] = useState(false);

  const toggleView = () => {
    setViewPass(!viewPass);
  };
  function onSubmit(values) {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
    }, 1000);
  }
  return (
    <>
      <Head>
        <title>Risèt modepas</title>
      </Head>

      <AuthLayout>
        <Box
          backgroundColor="white"
          width="100%"
          paddingX="6"
          maxWidth={{ md: "500px", lg: "400px" }}
        >
          <Heading as="h1" size="xl" paddingY="4" textAlign="center">
            Risèt modepas
          </Heading>

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

            <Button
              type="submit"
              width="full"
              variantColor="teal"
              variant="solid"
              my="4"
              isDisabled={formState.isSubmitting}
            >
              Voye enfòmasyon
            </Button>
          </Box>

          <Text my="4" color="gray.500">
            Lè ou klike voye ale. Wap jwen enstriksyon nan bwat emèl ou sou
            kijan pou risèt modepas la.
          </Text>

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

export default ResetPassword;
