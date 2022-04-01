import React, { useState, useMemo } from "react";
import { SnackbarProvider } from "notistack";
import { AppContext, defaultContext, AppContextType } from "../context";
import SelectionScreen from "./SelectionScreen";
import "./style.scss";
import GraphScreen from "./GraphScreen";

const App: React.FC = () => {
  const [contextValues, setContext] = useState<AppContextType>(defaultContext);
  const providerValue = useMemo(
    () => ({ ...contextValues, setContext }),
    [contextValues]
  );
  return (
    <AppContext.Provider value={providerValue}>
      <SnackbarProvider maxSnack={2}>
        {contextValues.page === "selection" ? (
          <SelectionScreen />
        ) : (
          <GraphScreen />
        )}
      </SnackbarProvider>
    </AppContext.Provider>
  );
};

export default App;
