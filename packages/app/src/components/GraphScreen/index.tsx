import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import axios from "axios";
import CytoscapeComponent from "react-cytoscapejs";
import cytoscape from "cytoscape";
import dagre from "cytoscape-dagre";
import { AppContext, AppContextType } from "../../context";
import styles from "./style.module.scss";
import { SERVER_URL, FALLBACK_ERROR_MESSAGE } from "../../constants";

const GRAPH_WIDTH = 1200;
const GRAPH_HEIGHT = 700;

cytoscape.use(dagre);

const GraphScreen: React.FC = () => {
  const { graphData, setContext } = useContext(AppContext);
  const { optionType, url } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const [cyto, setCyto] = useState<cytoscape.Core | null>(null);
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
  useEffect(() => {
    if (url) {
      axios
        .get(SERVER_URL + optionType + "/" + encodeURIComponent(url))
        .then((response) => {
          setContext((prev: AppContextType) => ({
            ...prev,
            graphData: response.data,
          }));
        })
        .catch((error) => {
          enqueueSnackbar(
            `Error: ${error.response.data || FALLBACK_ERROR_MESSAGE}`,
            { variant: "error" }
          );
        });
    }
  }, [url]);

  useEffect(() => {
    if (cyto) {
      cyto.resize();
      cyto.fit();
      cyto.layout({ name: "dagre" }).run();
    }
  }, [graphData, cyto]);

  return (
    <div className="content">
      <div className={styles.graphContainer}>
        {graphData && (
          <CytoscapeComponent
            cy={(cy) => {
              setCyto(cy);
            }}
            elements={graphData}
            style={{ width: `${GRAPH_WIDTH}px`, height: `${GRAPH_HEIGHT}px` }}
          />
        )}
      </div>
    </div>
  );
};

export default GraphScreen;
