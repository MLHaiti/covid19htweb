import React, { useState } from "react";
import Head from "next/head";
import { Heading, Box } from "@chakra-ui/core";
import { Layout } from "components";

import { fetch } from "utils/fetch";

const url = "/api/login";

export default () => {
  const [form, setForm] = useState({ email: "", passowrd: "" });

  const testLogin = async () => {
    try {
      const r = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "emmanu", password: "23432" }),
      });
      console.log(r);
    } catch (error) {
      console.log(error);
    }
  };

  const testCookie = async () => {
    try {
      const r = await fetch("/api/ping");
      console.log("we are cool");
      console.log(r);
    } catch (error) {
      console.log("we are pa cool");
      console.log(error);
    }
  };

  const testLogout = async () => {
    try {
      const r = await fetch("/api/logout");
      console.log("we are cool");
      console.log(r);
    } catch (error) {
      console.log("we are pa cool");
      console.log(error);
    }
  };

  return (
    <>
      <Head>
        <title>Konekte</title>
      </Head>
      <Layout>
        <Heading>Konekte</Heading>
        <Box onClick={testLogin}>Test login</Box>
        <br />
        <Box onClick={testCookie}>Test cookie</Box>

        <br />
        <Box onClick={testLogout}>Test cookie</Box>
      </Layout>
    </>
  );
};
