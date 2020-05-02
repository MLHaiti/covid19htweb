import React from "react";
import Router from "next/router";
import { DefaultSeo } from "next-seo";
import { ThemeProvider, CSSReset, ColorModeProvider } from "@chakra-ui/core";
import { initGA, logPageView } from "utils/analytics";
import SEO from "../setup/seo";
import { theme } from "../setup/theme";
import "@uppy/core/dist/style.css";

import "../styles/index.css";

class MyApp extends React.Component {
  componentDidMount() {
    initGA();
    logPageView();
    Router.events.on("routeChangeComplete", logPageView);
  }

  componentDidCatch(error, errorInfo) {
    // TODO Make sure we log the error for further investigation
    // console.log("CUSTOM ERROR HANDLING", error);
    // This is needed to render errors correctly in development / production
    super.componentDidCatch(error, errorInfo);
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <DefaultSeo {...SEO} />
        <ThemeProvider theme={theme}>
          <CSSReset />
          <ColorModeProvider>
            <Component {...pageProps} />
          </ColorModeProvider>
        </ThemeProvider>
      </>
    );
  }
}

export default MyApp;
