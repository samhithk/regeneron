import { PrismaClient } from "@prisma/client";

let db: PrismaClient | undefined = undefined;

if (db === undefined) {
  db = new PrismaClient();
}

export const prisma = db;
