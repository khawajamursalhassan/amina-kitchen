import React, { useState } from "react";

const NodeAction = ({ active, collapsed, setCollapsed }) => {
  const [showActions, setShowActions] = useState(false);
  return (
    <>
      <button
        style={{
          zIndex: 9,
          position: "absolute",
          top: 15,
          right: 15,
          background: "rgba(0, 0, 0, .9)",
          padding: 10,
          color: "white",
        }}
        onClick={() => setShowActions(true)}
      >
        Show Node Actions
      </button>

      {showActions && (
        <div
          style={{
            zIndex: 9,
            position: "absolute",
            top: 15,
            right: 15,
            background: "rgba(0, 0, 0, .9)",
            padding: 10,
            color: "white",
          }}
        >
            <button
                style={{ display: "block", width: "100%" }}
                onClick={() => setShowActions(false)}
            >
                Hide Node Actions
            </button>
          <h3>Node Actions</h3>
          {active ? (
            <>
              Selected: {active.node.label}
              <br />
              <button
                style={{ display: "block", width: "100%" }}
                onClick={() => {
                  if (!collapsed.includes(active.node.id)) {
                    setCollapsed([...collapsed, active.node.id]);
                  }
                }}
              >
                Collapse Node
              </button>
              <button
                style={{ display: "block", width: "100%" }}
                onClick={() => {
                  if (collapsed.includes(active.node.id)) {
                    setCollapsed(collapsed.filter((n) => n !== active.node.id));
                  }
                }}
              >
                Expand Node
              </button>
            </>
          ) : (
            <>Click a node to see options</>
          )}
          <h3>Collapsed Nodes</h3>
          <code>
            <pre>{JSON.stringify(collapsed, null, 2)}</pre>
          </code>
        </div>
      )}
    </>
  );
};

export default NodeAction;
