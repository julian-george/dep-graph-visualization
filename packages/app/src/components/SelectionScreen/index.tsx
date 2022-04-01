import React, { useState, useCallback } from "react";
import styles from "./style.module.scss";
import { VizOptionType } from "../../types";
import VizOptionsRow from "./VizOptionsRow";
import VizLoader from "./VizLoader";

const SelectionScreen: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<VizOptionType | null>(
    null
  );
  const resetOption = useCallback(() => {
    setSelectedOption(null);
  }, [selectedOption]);
  return (
    <div className={styles.content}>
      <div className={styles.title}>depwiz</div>
      {selectedOption ? (
        <VizLoader
          optionType={selectedOption}
          resetOption={() => {
            resetOption();
          }}
        />
      ) : (
        <VizOptionsRow setSelectedOption={setSelectedOption} />
      )}
    </div>
  );
};
export default SelectionScreen;
