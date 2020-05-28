import React, { useEffect } from "react";
import Router from "next/router";
import { DefaultSeo } from "next-seo";
import { ThemeProvider, CSSReset, ColorModeProvider } from "@chakra-ui/core";
import { initGA, logPageView } from "utils/analytics";
import { ErrorBoundary } from "components/ErrorBoundary";
import SEO from "../setup/seo";
import { theme } from "../setup/theme";

import "../styles/index.css";

// Will be called once for every metric that has to be reported.
export function reportWebVitals(metric) {
  // These metrics can be sent to any analytics service
  console.log(metric);
}

const MyApp = (props) => {
  useEffect(() => {
    initGA();
    logPageView();
    Router.events.on("routeChangeComplete", logPageView);
  }, []);

  const { Component, pageProps } = props;
  return (
    <ErrorBoundary>
      <DefaultSeo {...SEO} />
      <ThemeProvider theme={theme}>
        <CSSReset />
        <ColorModeProvider>
          <Component {...pageProps} />
        </ColorModeProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default MyApp;
