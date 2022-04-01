import React, { useCallback, useRef, useContext } from "react";
import { Input, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useSnackbar } from "notistack";
import axios from "axios";
import { VizOptionType } from "../../../types";
import styles from "./style.module.scss";
import { SERVER_URL, FALLBACK_ERROR_MESSAGE } from "../../../constants";
import { AppContext, AppContextType } from "../../../context";

interface VizLoaderProps {
  optionType: VizOptionType;
  resetOption: () => void;
}

const VizLoader: React.FC<VizLoaderProps> = ({ optionType, resetOption }) => {
  const urlInput = useRef<HTMLInputElement>(null);
  const { enqueueSnackbar } = useSnackbar();
  const { setContext } = useContext(AppContext);
  const loadVisualization = useCallback(() => {
    const url = urlInput?.current?.value;
    if (url) {
      axios
        .get(SERVER_URL + "github", { params: { url } })
        .then((response) => {
          setContext((prev: AppContextType) => ({
            ...prev,
            page: "graph",
            graphData: response.data,
          }));
        })
        .catch((error) => {
          enqueueSnackbar(
            `Error: ${error.response.data || FALLBACK_ERROR_MESSAGE}`,
            { variant: "error" }
          );
        });
    } else {
      enqueueSnackbar("Please enter a URL in the text input.", {
        variant: "error",
      });
    }
  }, [urlInput]);
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.headerRow}>
        <ArrowBackIcon className={styles.backButton} onClick={resetOption} />
        <h3>{`Insert ${optionType} URL here`}</h3>
      </div>
      <Input inputRef={urlInput} />
      <Button onClick={loadVisualization}>Submit</Button>
    </div>
  );
};

export default VizLoader;
