import React from "react";
import { Box } from "@chakra-ui/core";
import { Hero } from "components/hero";
import Header from "./header";
import Footer from "./footer";

export const Layout = ({ children, hideHero = false, ...rest }) => (
  <>
    <Header />
    <Box marginX="auto" maxWidth="960px" paddingX="16px" {...rest}>
      {hideHero ? null : <Hero />}
      {children}
    </Box>
    <Footer />
  </>
);
