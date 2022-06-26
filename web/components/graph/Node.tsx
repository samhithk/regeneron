import { ClinicalConcept } from "@prisma/client";
import { FC, useState } from "react";
import { NodePill } from "./NodePill";

export interface NodeProps {
  data: ClinicalConcept;
  childNodes?: ClinicalConcept[];
}

export const Node: FC<NodeProps> = ({ data, childNodes: children }) => {
  const [childNodes, setChildNodes] = useState<ClinicalConcept[]>([]);

  return (
    <div>
      <div className="flex">
        <NodePill
          name={data.displayName}
          onExpandClick={() => {
            setChildNodes(children || []);
          }}
        />
        {childNodes.length > 0 && (
          <div className="mt-14 -ml-8 space-y-2">
            {childNodes?.map((el) => (
              <Node key={el.id} data={el} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
