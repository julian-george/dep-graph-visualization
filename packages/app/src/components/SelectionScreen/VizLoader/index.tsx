import React, { useCallback, useRef } from "react";
import { Input, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { VizOptionType } from "../types";
import styles from "./style.module.scss";

interface VizLoaderProps {
  optionType: VizOptionType;
  resetOption: () => void;
}

const VizLoader: React.FC<VizLoaderProps> = ({ optionType, resetOption }) => {
  const urlInput = useRef<HTMLInputElement>(null);
  const loadVisualization = useCallback(() => {
    console.log(urlInput);
    // Fetch stuff here
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
