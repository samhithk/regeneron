import { S3Event } from "aws-lambda";
import { processCSV } from "./processCSV";
import { prisma } from "./db";
import { pingHeartBeat } from "./heartbeat";

export async function handler(event: S3Event) {
  let job;
  try {
    job = await prisma.fileProcessorJob.create({
      data: {
        fileName: `${event.Records[0].s3.object.key}-${event.Records[0].s3.object.versionId}`,
        lastHeartBeat: new Date(),
        jobState: "RUNNING",
      },
    });
    pingHeartBeat(job);
    await processCSV(event, job);
    await prisma.fileProcessorJob.update({
      where: { fileName: job.fileName },
      data: { jobState: "COMPLETED" },
    });
  } catch (e) {
    console.error(e);
    if (job !== undefined) {
      await prisma.fileProcessorJob.update({
        where: { fileName: job.fileName },
        data: { jobState: "FAILED" },
      });
    }
  } finally {
    await prisma.$disconnect();
  }
}
