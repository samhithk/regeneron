import type { NextApiRequest, NextApiResponse } from "next";
import AWS from "aws-sdk";
import formidable, { File, Options, Fields, Files } from "formidable";
import * as fs from "fs";
import util from "util";

const s3Client = new AWS.S3({
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};

function formidablePromise(req: NextApiRequest, opts?: Options) {
  return new Promise<{ fields: Fields; files: Files }>(function (
    resolve,
    reject
  ) {
    var form = new formidable.IncomingForm(opts);
    form.parse(req, function (err, fields, files) {
      if (err) return reject(err);
      resolve({ fields: fields, files: files });
    });
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { files } = await formidablePromise(req);

  const file = files["file"] as File;

  if (!file) {
    res.status(400).send("No file uploaded");
    return;
  }

  res.status(200).end();

  try {
    await s3Client
      .putObject({
        Bucket: "regeneron-csv",
        Key: `queue/${file.originalFilename}`,
        Body: fs.createReadStream(file.filepath),
      })
      .promise();
    res.status(201).send("Success");
  } catch (e) {
    res.status(500).end();
  }
}
