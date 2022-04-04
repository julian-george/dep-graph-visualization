import React, { ReactNode } from "react";
import { Link } from "react-router-dom";
import { VizOptionType } from "../../../types";
import styles from "./style.module.scss";

interface VizOptionProps {
  children?: ReactNode;
  callback: () => void;
}

const VizOption: React.FC<VizOptionProps> = ({ children, callback }) => (
  <div onClick={callback}>{children}</div>
);

interface VizOptionsRowProps {
  setSelectedOption: (optionType: VizOptionType) => void;
}

const VizOptionsRow: React.FC<VizOptionsRowProps> = ({ setSelectedOption }) => (
  <div className={styles.optionsContainer}>
    <VizOption
      callback={() => {
        setSelectedOption("github");
      }}
    >
      <span>GitHub commit tree</span>
      <img src="../../images/github_logo.png" alt="GitHub logo" />
    </VizOption>
    <VizOption
      callback={() => {
        setSelectedOption("npm");
      }}
    >
      <span>npm dependency tree</span>
      <img src="../../images/npm_logo.png" alt="npm logo" />
    </VizOption>
  </div>
);

export default VizOptionsRow;
