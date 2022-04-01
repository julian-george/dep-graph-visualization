import React, { useContext } from "react";
import { PageType, VizOptionType } from "./types";

export type AppContextType = {
  page: PageType;
  optionType: VizOptionType | null;
  graphData: any;
  graphMeta: any;
  setContext: React.Dispatch<React.SetStateAction<AppContextType>>;
};

export const defaultContext: AppContextType = {
  page: "selection",
  optionType: null,
  graphData: null,
  graphMeta: null,
  setContext: () => {},
};

export const AppContext = React.createContext<AppContextType>(defaultContext);

export const useAppContext = () => useContext(AppContext);
