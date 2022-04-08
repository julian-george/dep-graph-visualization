import React, { useContext } from "react";
import { GraphData } from "@dep-graph-visualization/shared";
import { VizOptionType } from "./types";

export type AppContextType = {
  optionType: VizOptionType | null;
  graphData: GraphData;
  graphMeta: any;
  setContext: React.Dispatch<React.SetStateAction<AppContextType>>;
};

export const defaultContext: AppContextType = {
  optionType: null,
  graphData: [],
  graphMeta: null,
  setContext: () => {},
};

// export const graphTestContext: AppContextType = {
//   page: "graph",
//   optionType: "github",
//   graphData: null,
//   graphMeta: null,
//   setContext: () => {},
// };

export const AppContext = React.createContext<AppContextType>(defaultContext);

export const useAppContext = () => useContext(AppContext);
