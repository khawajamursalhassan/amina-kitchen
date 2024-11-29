import React from "react";

const Tooltip = ({ hoverInfo, hoverPosition }) => {
  return (
    <div
      className="hover-info-container"
      style={{
        zIndex: 9,
 
        position: "absolute",
        top: hoverPosition[1] + 15,
        left: hoverPosition[0] + 15,

        // position: "fixed",
        // top: hoverPosition[1] + 10,
        // left: hoverPosition[0] + 10,
 
        background: "rgba(0, 0, 0, .4)",
        borderRadius: 10,
        padding: 10,
        color: "white",
      }}
    >
      <div className="hover-info">
        <h3>Hover Info</h3>
        <>
          <code>
            <pre>Label: {hoverInfo.node.label}</pre>
          </code>
        </>
      </div>
    </div>
  );
};

export default Tooltip;
