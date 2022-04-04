import React, { useRef, useMemo } from "react";
import CytoscapeComponent from "react-cytoscapejs";
import styles from "./style.module.scss";

const GraphScreen: React.FC = () => {
  const elements = [
    { data: { id: "one", label: "Node 1" }, position: { x: 50, y: 50 } },
    { data: { id: "two", label: "Node 2" }, position: { x: 100, y: 100 } },
    {
      data: { source: "one", target: "two", label: "Edge from Node1 to Node2" },
    },
  ];
  return (
    <div className="content">
      <div className={styles.graphContainer}>
        <CytoscapeComponent
          elements={elements}
          style={{ width: "600px", height: "600px" }}
        />
      </div>
    </div>
  );
};

export default GraphScreen;
