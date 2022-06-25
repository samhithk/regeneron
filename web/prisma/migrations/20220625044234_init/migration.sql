-- CreateEnum
CREATE TYPE "JOB_STATE" AS ENUM ('RUNNING', 'COMPLETED', 'FAILED');

-- CreateTable
CREATE TABLE "ClinicalConcept" (
    "id" SERIAL NOT NULL,
    "displayName" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "parentIds" JSONB NOT NULL,
    "childIds" JSONB NOT NULL,
    "alternateNames" TEXT[],

    CONSTRAINT "ClinicalConcept_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FileProcessorJob" (
    "fileName" TEXT NOT NULL,
    "jobState" "JOB_STATE" NOT NULL,
    "lastHeartBeat" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FileProcessorJob_pkey" PRIMARY KEY ("fileName")
);
