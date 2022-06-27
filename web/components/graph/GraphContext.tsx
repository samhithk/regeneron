import type { ClinicalConcept } from "@prisma/client";
import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

export interface GraphContextProviderProps {
  children: ReactNode;
}

export interface GraphContext {
  selectedConcept?: ClinicalConcept;
  setSelectedConcept: (concept?: ClinicalConcept) => void;
}

export const GraphContext = createContext<GraphContext>({
  setSelectedConcept: () => {},
});

export const GraphContextProvider: FC<GraphContextProviderProps> = ({
  children,
}) => {
  const [state, setState] = useState<ClinicalConcept>();
  return (
    <GraphContext.Provider
      value={{
        selectedConcept: state,
        setSelectedConcept: setState,
      }}
    >
      {children}
    </GraphContext.Provider>
  );
};
