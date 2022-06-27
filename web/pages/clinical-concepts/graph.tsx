import { ClinicalConcept } from "@prisma/client";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import { useClinicalConcept } from "../../api";
import {
  AppLayout,
  GraphContextProvider,
  Node,
  NodeEditor,
} from "../../components";
import { prisma } from "../../server";
import { Page } from "../../types";

interface GraphPageProps {
  root: ClinicalConcept;
}

const GraphPage: Page<GraphPageProps> = ({ root }) => {
  const [_, setSelectedConcept] = useState<ClinicalConcept>();
  const { data: rootNode } = useClinicalConcept(root.id, {
    initialData: root,
  });

  useEffect(() => {
    setSelectedConcept(rootNode);
  }, [setSelectedConcept, rootNode]);

  return (
    <div className="flex h-full w-full">
      <GraphContextProvider>
        <NodeEditor rootId={root.id} />
        <div className="h-full w-full overflow-hidden bg-gray-50">
          <div className="flex h-full w-full overflow-scroll p-6">
            {rootNode && <Node data={rootNode} />}
          </div>
        </div>
      </GraphContextProvider>
    </div>
  );
};

GraphPage.Layout = AppLayout;

export const getServerSideProps: GetServerSideProps<
  GraphPageProps
> = async () => {
  const root = await prisma.clinicalConcept.findUnique({
    where: { id: 1 },
  });

  if (root == null) {
    throw new Error("No Root Found!");
  }

  return {
    props: {
      root,
    },
  };
};

export default GraphPage;
