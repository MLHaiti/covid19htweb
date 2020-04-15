import React from "react";
import T from "prop-types";

import { FullDiv } from "components/brics";

export default function SecondaryMenu({ data, children }) {
  return <FullDiv height="8">{children}</FullDiv>;
}

SecondaryMenu.propTypes = {
  children: T.node,
};

SecondaryMenu.defaultProps = {
  children: "",
};
