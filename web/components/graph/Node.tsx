import { ClinicalConcept } from "@prisma/client";
import { FC, useCallback, useContext, useRef, useState } from "react";
import { useClinicalConceptChildren } from "../../api";
import { GraphContext } from "./GraphContext";
import { NodePill } from "./NodePill";

export interface NodeProps {
  data: ClinicalConcept;
}

export const Node: FC<NodeProps> = ({ data }) => {
  const { selectedConcept, setSelectedConcept } = useContext(GraphContext);
  const [enabled, setEnabled] = useState(false);
  const { data: childNodes, isLoading } = useClinicalConceptChildren(data.id, {
    enabled,
  });
  const ref = useRef<HTMLDivElement>(null);

  const offset = (ref.current?.offsetWidth || 112) / 2;

  const fetchClinicalConcepts = useCallback(async () => {
    setEnabled(true);
  }, [setEnabled]);

  function handleOnPillClick() {
    setSelectedConcept(data);
  }

  const hasChildren =
    data.childIds !== undefined &&
    data.childIds !== null &&
    (data.childIds as string[]).length > 0;

  return (
    <div>
      <div className="flex">
        <NodePill
          loading={isLoading}
          hasChildren={hasChildren}
          ref={ref}
          data={data}
          onPillClick={handleOnPillClick}
          handleOnExpandClick={fetchClinicalConcepts}
          isSelected={selectedConcept?.id === data.id}
        />
        {childNodes && childNodes.length > 0 && (
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
