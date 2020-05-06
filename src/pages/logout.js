import React, { useState, useEffect } from "react";
import { Box, Heading, Button, Text, useToast } from "@chakra-ui/core";
import fetch from "utils/fetch";
import { FullDiv } from "components";
import { PageTitle } from "utils/page-title";
import { TOAST_SUCCESS, TOAST_ERROR } from "utils/misc-helpers";

const Logout = () => {
  const toast = useToast();
  const [ok, setOk] = useState(null);

  useEffect(() => {
    dekonekte();
  }, []);

  const dekonekte = () => {
    fetch("/api/user/logout")
      .then(() => {
        setOk(true);
        toast(TOAST_SUCCESS);
      })
      .catch(() => {
        setOk(false);
        toast(TOAST_ERROR);
      });
  };

  if (ok === null) {
    return (
      <>
        <PageTitle title="Dekonekte" />
      </>
    );
  }

  if (ok === false) {
    setTimeout(() => {
      console.log("silent retry");
      fetch("/api/user/logout")
        .then(() => {})
        .catch(() => {});
    }, 2000);
    return (
      <>
        <PageTitle title="Dekonekte" />
        <FullDiv display="flex" direction="row" justifyContent="center">
          <Box
            backgroundColor="white"
            width="100%"
            paddingX="6"
            maxWidth={{ md: "500px", lg: "400px" }}
          >
            <Heading as="h1" size="xl" paddingY="8" textAlign="center">
              Dekonekte.
            </Heading>
            <Text>
              Gen yon erè ki pase.{" "}
              <Button
                variantColor="teal"
                variant="link"
                onClick={() => {
                  window.location = "/logout";
                }}
              >
                Eseye ankò
              </Button>
            </Text>
          </Box>
        </FullDiv>
      </>
    );
  }

  return (
    <>
      <PageTitle title="Dekonekte" />

      <FullDiv display="flex" direction="row" justifyContent="center">
        <Box
          backgroundColor="white"
          width="100%"
          paddingX="6"
          maxWidth={{ md: "500px" }}
        >
          <Heading
            as="h1"
            size="xl"
            width="full"
            paddingY="4"
            textAlign="center"
          >
            Dekonekte.
          </Heading>
          <Text mt="12" fontSize="xl" width="full">
            Ou dekonekte ak siksè.{" "}
            <Button
              as="span"
              variantColor="teal"
              variant="link"
              onClick={() => {
                window.location = "/";
              }}
            >
              Tounen nan paj dakèy la.
            </Button>
          </Text>
        </Box>
      </FullDiv>
    </>
  );
};
export default Logout;
