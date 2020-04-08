import React from "react";
import T from "prop-types";
import { Box, Button } from "@chakra-ui/core";
import useSWR, { mutate } from "swr";
import { managerRoleCheck } from "utils/user-helpers";
import { sideMenuStore } from "./store";

const SingleItem = ({ text, id, onClick }) => {
  const { data } = useSWR("sideMenuState", {
    initialData: sideMenuStore,
  });

  const { active } = data;

  const isActive = active === id;

  return (
    <Box marginBottom="4">
      {/* <Text color={isActive ? blue : "black"}>{text}</Text> */}
      <Box
        paddingY="2"
        paddingLeft="4"
        color="white"
        backgroundColor={isActive ? "#1637BC" : ""}
      >
        <Button
          color="white"
          width="100%"
          // alignItems="flex-start"
          justifyContent="flex-start"
          _hover={{
            textDecoration: "none",
          }}
          _focus={{ outline: "none" }}
          outline="none"
          // backgroundColor="blue.900"
          // color={isActive ? "white" : "black"}
          variant="link"
          onClick={() => {
            onClick(id);
            mutate("sideMenuState", { ...data, active: id }, false);
          }}
        >
          {text}
        </Button>
      </Box>
    </Box>
  );
};

SingleItem.propTypes = {
  text: T.string.isRequired,
  id: T.oneOfType([T.string, T.number]).isRequired,
  onClick: T.func,
};

SingleItem.defaultProps = {
  onClick: () => {},
};

export const SideMenu = () => {
  const { data: user } = useSWR("userState", {
    initialData: {},
  });

  const showManagement = user.isAdmin || managerRoleCheck(user.roles || []) > 0;

  console.log(showManagement, user.isAdmin, managerRoleCheck(user.roles || []));

  return (
    <Box paddingY={{ base: 8 }}>
      <SingleItem text="Paramèt" id="setting" />
      <SingleItem text="Atik" id="article" />
      {/* <SingleItem text="Bilten" id="bulletin" /> */}
      {showManagement ? (
        <SingleItem text="Jestyon itilizatè" id="management" />
      ) : null}
    </Box>
  );
};
