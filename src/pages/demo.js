import React from "react";
import { Box, Text } from "@chakra-ui/core";

import { Layout, NeutralAlert } from "components/layout";
import { PageTitle } from "utils/page-title";

export default () => (
  <>
    <PageTitle title="Demo components" />
    <Layout>
      <Box marginY="8">
        <Text>Démontre différent composents existants</Text>
      </Box>
      <NeutralAlert text="Toujou asire ou gen dlo ak savon lè moun vini an vizit lakay ou pou fè yo lave men yo. Sante youn se sante lòt." />
    </Layout>
  </>
);
