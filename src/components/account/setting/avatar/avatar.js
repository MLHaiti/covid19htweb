import React, { useState, useRef } from "react";
import T from "prop-types";
import { Flex, Avatar } from "@chakra-ui/core";

import { DashboardModal } from "@uppy/react";

import { getUppy } from "./getuppy";

export const ProfileAvatar = ({ current, onChange }) => {
  const [open, setOpen] = useState(false);
  const [src, setSrc] = useState(current); // https://bit.ly/sage-adebayo
  const uppy = useRef(null);

  const onClose = () => {
    if (uppy.current) {
      uppy.current.close();
      uppy.current = null;
    }
    setOpen(false);
  };

  const onClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    uppy.current = getUppy((result) => {
      const { successful } = result;
      if (successful.length === 0) return;
      const { uploadURL } = successful[0];
      setSrc(uploadURL);
      onChange(uploadURL);
    });
    setOpen(true);
  };

  return (
    <Flex
      marginTop="8"
      marginBottom="4"
      justifyContent="center"
      alignItems="center"
    >
      <Avatar cursor="pointer" onClick={onClick} size="2xl" src={src} />

      {!!open && !!uppy.current ? (
        <DashboardModal
          open={open}
          plugins={["UserWebcam"]}
          uppy={uppy.current}
          hidePauseResumeButton
          waitForThumbnailsBeforeUpload
          closeModalOnClickOutside
          onRequestClose={onClose}
          note="Foto sèlman"
        />
      ) : null}
    </Flex>
  );
};

ProfileAvatar.propTypes = {
  current: T.string.isRequired,
  onChange: T.func.isRequired,
};
