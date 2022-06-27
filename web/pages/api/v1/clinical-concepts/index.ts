// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ClinicalConcept } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../server/db";
import { ClinicalConceptPutForm } from "../../../../validation";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "PUT":
      {
        const validBody = await ClinicalConceptPutForm.parseAsync(req.body);

        let toUpdate: ClinicalConcept;

        if (validBody.id) {
          const existingConcept = await prisma.clinicalConcept.findUnique({
            where: { id: validBody.id },
          });
          if (existingConcept === null) {
            res.status(401).end();
            return;
          }
          toUpdate = existingConcept;
        } else {
          const { id, ...data } = validBody;
          toUpdate = await prisma.clinicalConcept.create({
            data,
          });
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
        const { id, ...data } = validBody;
        const clinicalConcept = await prisma.clinicalConcept.update({
          where: {
            id: toUpdate.id,
          },
          data,
        });

        res.status(200).json(clinicalConcept);
      }
      break;
    default: {
      res.status(404).end();
    }
  }
}
