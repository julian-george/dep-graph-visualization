import React, { useCallback, useRef } from "react";
import { Input, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { VizOptionType } from "../../../types";
import styles from "./style.module.scss";

interface VizLoaderProps {
  optionType: VizOptionType;
  resetOption: () => void;
}

const VizLoader: React.FC<VizLoaderProps> = ({ optionType, resetOption }) => {
  const urlInput = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const loadVisualization = useCallback(() => {
    let url = urlInput?.current?.value;
    if (url) {
      url = url.replace("http://", "");
      url = url.replace("https://", "");
      url = url.replace("github.com/", "");
      navigate(`/graph/${optionType}/${encodeURIComponent(url)}`);
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
      {optionType === "github" && (
        <span className={styles.example}>
          Ex: &apos;https://www.github.com/author/repo&apos; or just
          &apos;author/repo&apos;
        </span>
      )}
      <Input inputRef={urlInput} />
      <Button onClick={loadVisualization}>Submit</Button>
    </div>
  );
};

export default VizLoader;
