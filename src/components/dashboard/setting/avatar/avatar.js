// @ts-nocheck
import React, { useState, useRef, useEffect } from "react";
import { Box, Flex, Avatar, Button } from "@chakra-ui/core";
import Uppy from "@uppy/core";
// import Dashboard from "@uppy/dashboard";
import Webcam from "@uppy/webcam";
import Tus from "@uppy/tus";
import AwsS3 from "@uppy/aws-s3";
import { Dashboard, DashboardModal, DragDrop, ProgressBar } from "@uppy/react";
import { useWindowSize } from "utils/hooks/ui";

import fetch from "utils/fetch";

const buildUppySize = (width = 360) => {
  if (width <= 360) {
    return 300;
  }

  if (width <= 800) {
    return (2 * width) / 3;
  }

  return 417; // (1.4 * width) / 5;
};

export const ProfileAvatar = () => {
  const [open, setOpen] = useState(false);
  const [src, setSrc] = useState("https://bit.ly/sage-adebayo");
  const uppy = useRef(null);
  const { width } = useWindowSize();

  const uppySize = buildUppySize(width);

  const onOpen = () => {
    uppy.current = new Uppy({
      id: "profileAvatar",
      // debug: true,
      autoProceed: false,
      restrictions: {
        maxFileSize: 1000000,
        maxNumberOfFiles: 1,
        minNumberOfFiles: 1,
        allowedFileTypes: ["image/*"],
      },
    })
      // .use(Dashboard, { trigger: "#select-files" })
      .use(Webcam, { id: "UserWebcam", countdown: true, modes: ["picture"] })
      .use(AwsS3, {
        id: "AwsS3",
        getUploadParameters: (file) => {
          const params = {
            objectName: file.name,
            contentType: file.type,
          };
          const esc = encodeURIComponent;
          const query = Object.keys(params)
            .map((k) => `${esc(k)}=${esc(params[k])}`)
            .join("&");
          return fetch(`/api/aws/signurl?${query}`)
            .then((r) => {
              console.log(r);
              const {
                signedUrl,
                filename,
                originalName,
                publicUrl,
                method,
              } = r;
              return {
                method,
                url: signedUrl,
                fields: [],
                headers: {
                  "Content-Type": file.type,
                },
              };
            })
            .catch((error) => {
              console.log(error);
            });
        },
      })
      // .use(Tus, { endpoint: "https://master.tus.io/files/" })
      .on("complete", (result) => {
        console.log("Upload result:", result);
      })
      .on("upload-success", (file, data) => {
        console.log("upload success");
        console.log(file);
        console.log(data);
      });
  };

  const onClose = () => {
    uppy.current.close();
    uppy.current = null;
    setOpen(false);
  };

  const onClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onOpen();
    setOpen(true);
  };

  return (
    <Flex
      marginTop="8"
      marginBottom="4"
      justifyContent="center"
      alignItems="center"
    >
      {!open ? (
        <Avatar
          cursor="pointer"
          onClick={onClick}
          size="2xl"
          name="Segun Adebayo"
          src={src}
        />
      ) : null}

      {uppy.current && (
        <Flex
          width="full"
          direction="row"
          justifyContent={{
            base: "center",
            lg: "flex-end",
          }}
          alignItems="center"
          paddingRight={{ lg: "4" }}
        >
          <Box>
            <Dashboard
              width={uppySize || 320}
              height={250}
              plugins={["UserWebcam"]}
              uppy={uppy.current}
              hidePauseResumeButton
              waitForThumbnailsBeforeUpload
              note="Foto sèlman"
              metaFields={[
                { id: "name", name: "Name", placeholder: "file name" },
                {
                  id: "license",
                  name: "License",
                  placeholder: "specify license",
                },
                {
                  id: "caption",
                  name: "Caption",
                  placeholder: "describe what the image is about",
                },
                {
                  id: "public",
                  name: "Public",
                  render({ value, onChange }, h) {
                    return h("input", {
                      type: "checkbox",
                      onChange: (ev) =>
                        onChange(ev.target.checked ? "on" : "off"),
                      defaultChecked: value === "on",
                    });
                  },
                },
              ]}
            />
            <Button marginY="2" onClick={onClose} variantColor="red" size="sm">
              Cancel
            </Button>
          </Box>
        </Flex>
      )}
    </Flex>
  );
};
// showSelectedFiles
