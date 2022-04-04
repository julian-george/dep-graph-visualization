import React, { useContext, useMemo } from "react";
import CytoscapeComponent from "react-cytoscapejs";
import cytoscape from "cytoscape";
import dagre from "cytoscape-dagre";
import { AppContext } from "../../context";
import styles from "./style.module.scss";

const GRAPH_WIDTH = 1200;
const GRAPH_HEIGHT = 700;

const GraphScreen: React.FC = () => {
  cytoscape.use(dagre);
  const { graphData } = useContext(AppContext);
  // const stylesheet = useMemo(
  //   () => ({
  //     selector: "node",
  //     style: {
  //       width: GRAPH_HEIGHT / graphData.length,
  //       height: GRAPH_HEIGHT / graphData.length,
  //     },
  //   }),
  //   [graphData]
  // );
  return (
    <div className="content">
      <div className={styles.graphContainer}>
        <CytoscapeComponent
          elements={graphData}
          style={{ width: `${GRAPH_WIDTH}px`, height: `${GRAPH_HEIGHT}px` }}
          // stylesheet={stylesheet}
          layout={{ name: "dagre" }}
        />
      </div>
    </div>
  );
};

export default GraphScreen;
