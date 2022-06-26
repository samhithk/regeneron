import { AppLayout, Node } from "../../components";
import { Page } from "../../types";
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from "next";
import { ClinicalConcept } from "@prisma/client";
import { prisma } from "../../server";

interface GraphProps {
  clinicalConcepts: ClinicalConcept[];
}

const Graph: Page<GraphProps> = ({ clinicalConcepts }) => {
  return (
    <div className="flex h-full w-full">
      <div className="w-80 border-r border-gray-200"></div>
      <div className="h-full w-full overflow-hidden bg-gray-50">
        <div className="flex h-full w-full overflow-scroll p-6">
          <Node
            data={clinicalConcepts[0]}
            childNodes={[clinicalConcepts[1], clinicalConcepts[2]]}
          />
        </div>
      </div>
    </div>
  );
};

Graph.Layout = AppLayout;

export const getServerSideProps: GetServerSideProps<GraphProps> = async (
  context
) => {
  return {
    props: {
      clinicalConcepts: await prisma.clinicalConcept.findMany(),
    },
  };
};

export default Graph;
