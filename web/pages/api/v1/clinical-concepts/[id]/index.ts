// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../../server/db";
import { ClinicalConceptPutForm } from "../../../../../validation";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      {
        const { id } = req.query;
        const concept = await prisma.clinicalConcept.findUnique({
          where: { id: +id },
        });

        if (concept === null) {
          res.status(401).end();
          return;
        }

        res.status(200).json(concept);
      }
      break;
    case "PUT":
      {
        const { id } = req.query;
        const validBody = await ClinicalConceptPutForm.parseAsync(req.body);

        const toUpdate = await prisma.clinicalConcept.findUnique({
          where: { id: +id },
        });

        if (toUpdate === null) {
          res.status(401).end();
          return;
        }

        const children = await prisma.clinicalConcept.findMany({
          where: { id: { in: validBody.childIds } },
        });

        const parents = await prisma.clinicalConcept.findMany({
          where: { id: { in: validBody.parentIds } },
        });

        await Promise.all(
          children.map((child) => {
            prisma.clinicalConcept.update({
              where: { id: child.id },
              data: {
                parentIds: [...(child.parentIds as number[]), toUpdate.id],
              },
            });
          })
        );

        await Promise.all(
          parents.map((parent) => {
            prisma.clinicalConcept.update({
              where: { id: parent.id },
              data: {
                childIds: [...(parent.childIds as number[]), toUpdate.id],
              },
            });
          })
        );

        const clinicalConcept = await prisma.clinicalConcept.update({
          where: {
            id: +id,
          },
          data: {
            ...validBody,
          },
        });

        res.status(200).json(clinicalConcept);
      }
      break;
    default: {
      res.status(404).end();
    }
  }
}
