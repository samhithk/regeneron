import { parse } from "csv-parse";
import * as AWS from "aws-sdk";
import { S3Event } from "aws-lambda";
import { processCSVRecord } from "./processRecord";
import { FileProcessorJob } from "@prisma/client";

const S3 = new AWS.S3({ apiVersion: "2006-03-01" });

export async function processCSV(event: S3Event, job: FileProcessorJob) {
  const parser = S3.getObject({
    Bucket: event.Records[0].s3.bucket.name,
    Key: event.Records[0].s3.object.key,
  })
    .createReadStream()
    .pipe(
      parse({
        delimiter: ",",
        trim: true,
        fromLine: 2,
        columns: [
          "conceptId",
          "displayName",
          "description",
          "parentIds",
          "childIds",
          "alternateNames",
        ],
      })
    );

  for await (const record of parser) {
    await processCSVRecord(record);
  }
}
