import React, { useEffect, useRef } from "react";
import { Network } from "vis-network/standalone/esm/vis-network";

const VisNetwork = ({ nodes, edges }) => {

  const networkRef = useRef(null);

  useEffect(() => {
    const container = networkRef.current;
    const data = { nodes, edges };
    const options = {
      layout: {
        hierarchical: {
          direction: "LR",
          sortMethod: "directed",
          nodeSpacing: 150,
          levelSeparation: 200,
        },
      },
      edges: {
        smooth: false,
        color: "#000000",
        arrows: {
          to: { enabled: true, scaleFactor: 1, type: "arrow" },
        },
      },
      nodes: {
        shape: "image",
        size: 16,
        font: {
          size: 16,
          color: "#000000",
        },
        borderWidth: 2,
        widthConstraint: {
          minimum: 20,
          maximum: 150
        },
      },
    };

    const network = new Network(container, data, options);

    return () => {
      network.destroy();
    };
  }, [nodes, edges]);

  return <div ref={networkRef} style={{ height: "500px" }} />;
};

export default VisNetwork;
