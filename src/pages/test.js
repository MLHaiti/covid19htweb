import React from "react";
import Link from "next/link";
import { Box } from "@chakra-ui/core";
import ReactS3Uploader from "react-s3-uploader";

import _fetch from "utils/fetch";

const slate = () => (
  <div>
    <div>We will test slate</div>
    <Box>
      <Link href="/dashboard">
        <a>Return bro</a>
      </Link>
      <Box marginY="12">
        <p>We will test uploading to S3</p>
        <input
          type="file"
          onChange={(e) => {
            console.log("change");
            const { files } = e.target;
            console.log(files);
            const file = files[0];
            const params = {
              objectName: file.name,
              contentType: file.type,
            };

            const esc = encodeURIComponent;
            const query = Object.keys(params)
              .map((k) => `${esc(k)}=${esc(params[k])}`)
              .join("&");

            const url = `/api/aws/signurl?${query}`;

            _fetch(url)
              .then((r) => {
                console.log(r);
                const { signedUrl } = r;
                return fetch(signedUrl, {
                  method: "PUT",
                  body: file,
                });
              })
              .then((r) => {
                console.log("the whole r");
                console.log(r);
              })
              .catch((error) => {
                console.log(error);
              });
          }}
        />

        <br />
        <br />
        <br />

        <ReactS3Uploader
          accept="image/*"
          autoUpload
          contentDisposition="auto"
          getSignedUrl={(file, callback) => {
            const params = {
              objectName: file.name,
              contentType: file.type,
            };

            const esc = encodeURIComponent;
            const query = Object.keys(params)
              .map((k) => `${esc(k)}=${esc(params[k])}`)
              .join("&");

            _fetch(`/api/aws/signurl?${query}`)
              .then((r) => {
                console.log("passing", r);
                callback(r);
              })
              .catch((error) => {
                console.log(error);
              });
          }}
          onError={(error) => {
            console.log("onError");
            console.log(error);
          }}
          onFinish={() => {
            console.log("onFinish");
          }}
        />
      </Box>
    </Box>
  </div>
);

export default slate;
