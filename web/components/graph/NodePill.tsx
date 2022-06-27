import { ClinicalConcept } from "@prisma/client";
import { FC, forwardRef, useContext, useEffect, useState } from "react";
import { GraphContext } from "./GraphContext";

export interface NodePillProps {
  data: ClinicalConcept;
  hasChildren?: boolean;
  onPillClick?: () => void | Promise<void>;
  handleOnExpandClick?: () => void | Promise<void>;
  isSelected?: boolean;
  loading?: boolean;
}

export const NodePill = forwardRef<HTMLDivElement, NodePillProps>(
  (
    {
      data,
      onPillClick,
      handleOnExpandClick,
      hasChildren = false,
      isSelected = false,
      loading = false,
    },
    ref
  ) => {
    const { selectedConcept } = useContext(GraphContext);
    const [open, setOpen] = useState(false);

    return (
      <div>
        <div ref={ref} className="flex items-center">
          <div
            className={`flex cursor-pointer overflow-hidden rounded-md border bg-white ${
              isSelected
                ? "divide-x divide-gray-700 border border-gray-700"
                : "divide-x divide-gray-300 border-gray-300"
            } shadow-sm`}
          >
            <button
              onClick={() => onPillClick?.()}
              role="button"
              className="flex items-center py-2 px-4"
            >
              <p className="whitespace-nowrap text-sm font-medium">
                {data.displayName}
              </p>
            </button>
            <button
              onClick={() => {
                setOpen(true);
                handleOnExpandClick?.();
              }}
              className={`${
                hasChildren ? "flex" : "hidden"
              } items-center px-2 text-gray-500 transition hover:text-black`}
            >
              {loading || open ? (
                <i
                  className={`bi-arrow-repeat ${
                    loading ? "animate-spin text-gray-500" : ""
                  } text-lg`}
                ></i>
              ) : (
                <i className="bi-diagram-2 text-lg"></i>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }
);

NodePill.displayName = "Search";

// export const NodePill: FC<NodePillProps> = ({
//   name,
//   onPillClick,
//   onExpandClick,
// }) => {
//   return (
//     <div>
//       <div className="flex items-center">
//         <div className="flex cursor-pointer divide-x divide-gray-300 overflow-hidden rounded-md border border-gray-300  bg-white shadow-sm">
//           <button
//             onClick={() => onPillClick?.()}
//             role="button"
//             className="flex items-center py-2 px-4"
//           >
//             <p className="whitespace-nowrap text-sm font-medium">{name}</p>
//           </button>
//           <button
//             onClick={() => onExpandClick?.()}
//             className="flex items-center px-2 text-gray-500 transition hover:text-black"
//           >
//             <i className="bi-diagram-2 text-lg"></i>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };
