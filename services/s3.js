import AWS from "aws-sdk";
import dataUriToBuffer from "data-uri-to-buffer";
import uuid from "uuid/v4";

AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});
export const uploadAvatarToS3 = (file, cropped = false) => {
  return new Promise((resolve, reject) => {
    const s3 = new AWS.S3();
    const decoded = dataUriToBuffer(file);
    const unix = +new Date();
    const reference = `${uuid()}_${unix}.png`;
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `avatars/${reference}`,
      // ContentType: "image/png",
      Body: decoded,
      ACL: "public-read"
    };
    if (cropped) params.ContentEncoding = "base64";
    s3.upload(params)
      .promise()
      .then(response => {
        resolve({ reference, ...response });
      })
      .catch(reject);
  });
};
