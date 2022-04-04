import React, { useState, useMemo } from "react";
import { SnackbarProvider } from "notistack";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SelectionScreen />} />
            <Route path="/github" element={<GraphScreen />} />
          </Routes>
        </BrowserRouter>
      </SnackbarProvider>
    </AppContext.Provider>
  );
};

export default App;
