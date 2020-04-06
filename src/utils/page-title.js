import React from "react";
import Head from "next/head";
import T from "prop-types";

export const PageTitle = ({ title, children }) => (
  <Head>
    <title>{title} - codvid19ht</title>
    {children}
  </Head>
);

PageTitle.propTypes = {
  title: T.string.isRequired,
  children: T.node,
};

PageTitle.defaultProps = {
  children: null,
};
