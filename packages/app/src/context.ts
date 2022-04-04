import React, { useContext } from "react";
import { VizOptionType } from "./types";

export type AppContextType = {
  optionType: VizOptionType | null;
  graphData: any;
  graphMeta: any;
  setContext: React.Dispatch<React.SetStateAction<AppContextType>>;
};

export const defaultContext: AppContextType = {
  optionType: null,
  graphData: null,
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
