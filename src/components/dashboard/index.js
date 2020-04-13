import React from "react";
import { FullPageLoading } from "components";
import {
  Box,
  Flex,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  // DrawerCloseButton,
} from "@chakra-ui/core";
import { useUser } from "utils/hooks";
import useSWR from "swr";

import { PageTitle } from "utils/page-title";
import { TopMenu } from "./top-menu";

import { WrappedMenu } from "./layout";
import { sideMenuStore } from "./store";
import SettingView from "./setting";
import ArticleView from "./article";
// import BulletinView from "./bulleting";
import ManagementView from "./management";

export default () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data } = useSWR("sideMenuState", {
    initialData: sideMenuStore,
  });

  const user = useUser();

  const { active } = data;

  if (!user) {
    return (
      <>
        <PageTitle title="Dachbòd" />
        <FullPageLoading />
      </>
    );
  }

  return (
    <>
      <PageTitle title="Dachbòd" />
      <TopMenu
        onMenuClick={() => {
          isOpen ? onClose() : onOpen();
        }}
        isOpen={isOpen}
      />

      <Flex direction="row" minHeight="full" backgroundColor="#ffffff">
        <Drawer size={202} isOpen={isOpen} placement="left" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerBody padding={0}>
              <WrappedMenu />
            </DrawerBody>
          </DrawerContent>
        </Drawer>

        <WrappedMenu display={{ base: "none", lg: "block" }} />

        <Box
          minHeight="full"
          width="100%"
          marginTop="50px"
          marginLeft={{ base: 0, lg: "202px" }}
        >
          {active === "setting" ? <SettingView user={user} /> : null}
          {active === "article" ? <ArticleView /> : null}
          {/* {active === "bulletin" ? <BulletinView user={user} /> : null} */}
          {active === "management" ? <ManagementView /> : null}
        </Box>
      </Flex>
    </>
  );
};
