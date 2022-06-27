// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ClinicalConcept } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../../server/db";

type Data = {
  children: ClinicalConcept[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET": {
      const { id } = req.query;
      const children = await prisma.clinicalConcept.findMany({
        where: {
          parentIds: {
            array_contains: [+id],
          },
        },
      });
      res.status(200).json({ children });
    }
    default: {
      res.status(404).end();
    }
  }
}
