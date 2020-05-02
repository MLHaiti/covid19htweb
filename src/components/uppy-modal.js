// @ts-nocheck
import React, { useState, useRef, useEffect } from "react";
import T from "prop-types";
import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
  Text,
} from "@chakra-ui/core";
import Uppy from "@uppy/core";
import AwsS3 from "@uppy/aws-s3";
import { Dashboard } from "@uppy/react";

import fetch from "utils/fetch";

const defaultOptions = {
  autoProceed: false,
  restrictions: {
    maxFileSize: 1000000,
    maxNumberOfFiles: 1,
    minNumberOfFiles: 1,
    allowedFileTypes: ["image/*"],
  },
};

export const UppyModal = ({
  id,
  onModalClose,
  headerText,
  OpenElement,
  uppyOptions,
  dashboardOptions,
}) => {
  const uppy = useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = useState([]);

  useEffect(() => {
    uppy.current = new Uppy({
      id,
      ...defaultOptions,
      ...uppyOptions,
    })
      // .use(Dashboard, { trigger: "#select-files" })
      // .use(Webcam, { id: "UserWebcam", countdown: true, modes: ["picture"] })
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

      .on("complete", ({ successful }) => {
        setData(
          successful.map(({ type, uploadURL }) => ({
            type,
            uploadURL,
          }))
        );
      });
    // .on("upload-success", (file, data) => {}); // TODO REPLACE

    return () => {
      uppy.current.close();
      uppy.current = null;
    };
  }, []);

  return (
    <>
      <OpenElement onOpen={onOpen} />

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="xl"
        closeOnEsc={false}
        closeOnOverlayClick={false}
        returnFocusOnClose={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text>{headerText}</Text>
          </ModalHeader>

          <ModalBody>
            <Box paddingY="4">
              {uppy.current && (
                <Dashboard
                  uppy={uppy.current}
                  height={250}
                  // plugins={["UserWebcam"]}
                  hidePauseResumeButton
                  waitForThumbnailsBeforeUpload
                  {...dashboardOptions}
                />
              )}
            </Box>
          </ModalBody>

          <ModalFooter>
            {data.length > 0 ? (
              <Button
                variantColor="blue"
                variant="ghost"
                mr={3}
                onClick={() => {
                  onModalClose(data);
                  onClose();
                }}
              >
                Fèmen
              </Button>
            ) : (
              <Button
                variantColor="blue"
                variant="ghost"
                mr={3}
                onClick={onClose}
              >
                Anile
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

UppyModal.propTypes = {
  onModalClose: T.func.isRequired,
  uppyOptions: T.object,
  dashboardOptions: T.object,
  headerText: T.string.isRequired,
  OpenElement: T.elementType.isRequired,
  id: T.string.isRequired,
};

UppyModal.defaultProps = {
  uppyOptions: {},
  dashboardOptions: {},
};
