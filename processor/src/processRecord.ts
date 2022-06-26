import { prisma } from "./db";

interface CSVRecord {
  conceptId: string;
  displayName: string;
  description: string;
  parentIds: string;
  childIds: string;
  alternateNames: string;
}

export async function processCSVRecord(record: CSVRecord) {
  await prisma.clinicalConcept.upsert({
    where: { id: +record.conceptId },
    create: transformRecord(record),
    update: transformRecord(record),
  });
}

function transformRecord(record: CSVRecord) {
  return {
    id: +record.conceptId,
    displayName: record.displayName,
    description: record.description,
    alternateNames: record.alternateNames
      .split(",")
      .filter((name) => name !== "null"),
    childIds: record.childIds
      .split(",")
      .filter((id) => id !== "null")
      .map((id) => +id),
    parentIds: record.parentIds
      .split(",")
      .filter((id) => id !== "null")
      .map((id) => +id),
  };
}
