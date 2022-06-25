import { FileProcessorJob } from "@prisma/client";
import { prisma } from "./db";

const PING_INTERVAL = 1000 * 60;

export async function pingHeartBeat(job: FileProcessorJob) {
  setInterval(async () => {
    await prisma.fileProcessorJob.update({
      where: { fileName: job.fileName },
      data: { lastHeartBeat: new Date() },
    });
  }, PING_INTERVAL);
}
