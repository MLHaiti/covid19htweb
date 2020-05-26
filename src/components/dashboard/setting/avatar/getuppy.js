import Uppy from "@uppy/core";
import Webcam from "@uppy/webcam";
import AwsS3 from "@uppy/aws-s3";

import fetch from "utils/fetch";

export const getUppy = (onComplete) =>
  new Uppy({
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
            const { signedUrl, filename, originalName, publicUrl, method } = r;
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
    .on("complete", onComplete);
