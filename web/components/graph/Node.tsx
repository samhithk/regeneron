import { ClinicalConcept } from "@prisma/client";
import { FC, useRef, useState } from "react";
import { NodePill } from "./NodePill";
import axios from "axios";
import { BASE_API_URL } from "../../api/config";

export interface NodeProps {
  data: ClinicalConcept;
  childNodes?: ClinicalConcept[];
}

export const Node: FC<NodeProps> = ({ data, childNodes: children }) => {
  const [childNodes, setChildNodes] = useState<ClinicalConcept[]>([]);
  const ref = useRef<HTMLDivElement>(null);

  const offset = (ref.current?.offsetWidth || 112) / 2;

  async function handleOnExpand() {
    const response = await axios.get(
      `${BASE_API_URL}/clinical-concepts/${data.id}/children`
    );
    setChildNodes(response.data.children);
  }

  return (
    <div>
      <div className="flex">
        <NodePill
          ref={ref}
          name={data.displayName}
          onExpandClick={handleOnExpand}
        />
        {childNodes.length > 0 && (
          <div
            className="mt-14 space-y-4"
            style={{
              marginLeft: `-${offset}px`,
            }}
          >
            {childNodes?.map((el) => (
              <Node key={el.id} data={el} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
