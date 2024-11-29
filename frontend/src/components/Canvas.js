import React, { useState, useRef } from "react";
import { GraphCanvas, useSelection } from "reagraph";
import Tooltip from "./Tooltip";
import NodeAction from "./NodeAction";

function Canvas({nodes, edges}) {
  const [active, setActive] = useState(null);
  const [collapsed, setCollapsed] = useState([]);
  const [hoverPosition, setHoverPosition] = useState([0, 0]);
  const [hoverInfo, setHoverInfo] = useState(null);
  const [showHoverInfo, setShowHoverInfo] = useState(false);

  const graphRef = useRef(null);

  const { selections, actives, onNodeClick, onCanvasClick } = useSelection({
    ref: graphRef,
    nodes: nodes,
    edges: edges,
    pathSelectionType: "all",
  });

  const handleNodeClick = (node, props) => {
    setActive({ node, props });
    onNodeClick(node, props);
  };

  const handleNodeHover = (node, props) => {
    setHoverInfo({ node, props });
    setShowHoverInfo(true);
    setHoverPosition([props.x, props.y]);
  };

  return (
<div style={{ position: "absolute", border: '1px solid black', top: 100, bottom: 10, left: '50vw', right: 10 }}>
      <NodeAction
        active={active}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />
      {showHoverInfo && (
        <Tooltip hoverInfo={hoverInfo} hoverPosition={hoverPosition} />
      )}
      <GraphCanvas
        ref={graphRef}
        labelType="nodes"
        onNodePointerOver={handleNodeHover}
        onNodePointerOut={() => setShowHoverInfo(false)}
        collapsedNodeIds={collapsed}
        nodes={nodes}
        edges={edges}
        selections={selections}
        actives={actives}
        onCanvasClick={onCanvasClick}
        onNodeClick={handleNodeClick}
      />
    </div>
  );
}

export default Canvas;
