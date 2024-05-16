import React, { useCallback, useState } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
} from "reactflow";

import "../../node_modules/reactflow/dist/style.css";
import CustomNode from "../components/CustomNode.tsx";

const nodeTypes = { customNode: CustomNode };
const Flow = ({
  nodes,
  setNodes,
  edges,
  setEdges,
  selectedNode,
  setSelectedNode,
}) => {
  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes],
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges],
  );
  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges],
  );

  //  const onNodeClick = useCallback(
  //    (event, node) => {
  //      event.stopPropagation();
  //
  //      setNodes((nds) => nds.filter((n) => n.id !== node.id));
  //    },
  //    [setNodes],
  //  );

  const onNodeClick = (event, node) => {
    console.log(node);
    setSelectedNode(node);
  };

  const onEdgeClick = useCallback(
    (event, edge) => {
      event.stopPropagation();
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    },
    [setEdges],
  );

  return (
    <div className="flow-container" style={{ width: "700px", height: "700px" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onEdgeClick={onEdgeClick}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        style={{ background: "#d2effc", borderRadius: "5px" }}
      >
        <Controls />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
};

export default Flow;
