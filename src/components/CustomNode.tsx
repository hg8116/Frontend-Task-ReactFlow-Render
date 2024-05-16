import React, { useState } from "react";
import { Handle, Position } from "reactflow";

const CustomNode = ({ data, isConnectable }) => {
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  const handleDeleteClick = () => {
    data.toDelete = "y";
    data.onDeleteButton(data.id);
  };

  return (
    <div
      className="custom-node"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      {data.label}
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
      />
      {hovered && (
        <button
          onClick={handleDeleteClick}
          style={{
            position: "absolute",
            top: 5,
            right: 5,
            background: "red",
            color: "white",
            border: "none",
            borderRadius: "50%",
            width: 20,
            height: 20,
            cursor: "pointer",
          }}
        >
          X
        </button>
      )}
    </div>
  );
};

export default CustomNode;
