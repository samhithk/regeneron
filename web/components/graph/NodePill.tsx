import { FC, forwardRef } from "react";

export interface NodePillProps {
  name: string;
  onPillClick?: () => void | Promise<void>;
  onExpandClick?: () => void | Promise<void>;
}

export const NodePill = forwardRef<HTMLDivElement, NodePillProps>(
  ({ name, onPillClick, onExpandClick }, ref) => {
    return (
      <div>
        <div ref={ref} className="flex items-center">
          <div className="flex cursor-pointer divide-x divide-gray-300 overflow-hidden rounded-md border border-gray-300  bg-white shadow-sm">
            <button
              onClick={() => onPillClick?.()}
              role="button"
              className="flex items-center py-2 px-4"
            >
              <p className="whitespace-nowrap text-sm font-medium">{name}</p>
            </button>
            <button
              onClick={() => onExpandClick?.()}
              className="flex items-center px-2 text-gray-500 transition hover:text-black"
            >
              <i className="bi-diagram-2 text-lg"></i>
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
