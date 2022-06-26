import { AppLayout, Node } from "../../components";
import { Page } from "../../types";
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from "next";
import { ClinicalConcept } from "@prisma/client";
import { prisma } from "../../server";

interface GraphProps {
  root: ClinicalConcept;
}

const Graph: Page<GraphProps> = ({ root }) => {
  return (
    <div className="flex h-full w-full">
      <div className="w-80 border-r border-gray-200"></div>
      <div className="h-full w-full overflow-hidden bg-gray-50">
        <div className="flex h-full w-full overflow-scroll p-6">
          <Node
            data={root}
            // childNodes={[clinicalConcepts[1], clinicalConcepts[2]]}
          />
          {/* <div>
            {Array.from(Array(100).keys()).map((el) => (
              <div key={el} className="flex">
                {Array.from(Array(20).keys()).map((el) => (
                  <div key={el} className="m-4 h-20 w-20 bg-red-500"></div>
                ))}
              </div>
            ))}
          </div> */}
        </div>
      </div>
    </div>
  );
};

Graph.Layout = AppLayout;

export const getServerSideProps: GetServerSideProps<GraphProps> = async (
  context
) => {
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

export default Graph;
