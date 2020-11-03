import nextConnect from "next-connect";
import AWS from "aws-sdk";
import { v4 as uuidv4 } from "uuid";

import session from "middlewares/session";

const handler = nextConnect();

handler.use(session);

const options = {
  bucket: "covid19mlhaiti",
  region: "us-east-1",
  signatureVersion: "v4",
  ACL: "public-read",
};

const credentials = {
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_KEY,
};

AWS.config.update({ credentials, region: options.region });
const s3 = new AWS.S3();

// var presignedGETURL = s3.getSignedUrl('getObject', {
//   Bucket: 'presignedurldemo',
//   Key: 'image.jpg', //filename
//   Expires: 100 //time to expire in seconds
// });

handler.get((req, res) => {
  // const presignedPUTURL = s3.getSignedUrl("putObject", {
  //   Bucket: options.bucket,
  //   Key: "user12/image.jpg", // filename
  //   Expires: 300, // time to expire in seconds
  // });

  const { objectName, contentType } = req.query;

  const filename = `${objectName.split(".")[0]}-${uuidv4()}.${
    objectName.split(".")[1]
  }`;

  const params = {
    Bucket: options.bucket,
    Key: filename,
    Expires: 120,
    ContentType: contentType,
    ACL: options.ACL,
  };

  const signedUrl = s3.getSignedUrl("putObject", params);

  if (signedUrl) {
    return res.json({
      signedUrl,
      filename,
      originalName: objectName,
      publicUrl: signedUrl.split("?").shift(),
      method: "PUT",
    });
  }

  res.status(500).json({ message: "Internal server error" });
});

export default handler;
