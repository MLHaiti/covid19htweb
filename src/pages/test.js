import React from "react";
import Link from "next/link";
// import dynamic from "next/dynamic";
// import Dante from "Dante2";
import { Box } from "@chakra-ui/core";

import Editor from "components/slate/rich";

const slate = () => (
  <div>
    <div>We will test slate</div>
    <Box>
      <Link href="/dashboard">
        <a>Return bro</a>
      </Link>
    </Box>
  </div>
);

export default slate;
