import React, { useState } from "react";
import Flow from "../components/Flow.tsx";
import { v4 as uuid } from "uuid";
import CustomNode from "../components/CustomNode.tsx";

const initialNodes = [
  {
    id: "1",
    type: "customNode",
    position: { x: 100, y: 100 },
    data: { label: 1 },
  },
];

const initialEdges = [];

const nodeTypes = { customNode: CustomNode };

const Home = () => {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const [count, setCount] = useState(2);

  const [selectedNode, setSelectedNode] = useState(null);
  const [tempName, setTempName] = useState(null);

  const addNode = () => {
    if (nodes.length == 0) {
      setNodes(initialNodes);
      return;
    }
    let lastNode = nodes[nodes.length - 1];
    let newNode = {
      id: uuid(),
      type: lastNode.type,
      position: { x: lastNode.position.x, y: lastNode.position.y + 100 },
      data: { label: count },
    };
    setCount(count + 1);

    console.log(newNode);
    setNodes([...nodes, newNode]);
  };

  const onDelete = () => {
    setNodes((nds) => nds.filter((n) => n.id !== selectedNode.id));
    setSelectedNode(nodes[0]);
  };

  const onCancel = () => {
    setTempName("");
    setSelectedNode(null);
  };

  const onSave = () => {
    setNodes((prevNodes) =>
      prevNodes.map((node) =>
        node.id === selectedNode.id
          ? { ...node, data: { label: tempName } }
          : node,
      ),
    );
    setTempName("");
    setSelectedNode(null);
  };

  return (
    <div className="home-container">
      <h1>ReactFlow Render</h1>
      <div className="content-container">
        <button onClick={addNode} className="add-node-button">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path
                fill="currentColor"
                d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z"
              ></path>
            </svg>{" "}
            Create Node
          </span>
        </button>
        <div className="sub-container">
          <Flow
            nodes={nodes}
            setNodes={setNodes}
            edges={edges}
            setEdges={setEdges}
            selectedNode={selectedNode}
            setSelectedNode={setSelectedNode}
          />
          <div className="info-box">
            {selectedNode === null ? (
              <div>Click on a Node to Edit!</div>
            ) : (
              <>
                <h3>Edit Node: {selectedNode.data.label}</h3>
                <div className="inputs">
                  <div className="input-pair">
                    <label>Title</label>
                    <input
                      placeholder={selectedNode.data.label}
                      onChange={(e) => {
                        setTempName(e.target.value);
                      }}
                    />
                  </div>
                  <div className="info-buttons">
                    <div className="delete-btn" onClick={onDelete}>
                      Delete
                    </div>
                    <div className="cancel-btn" onClick={onCancel}>
                      Cancel
                    </div>
                    <div className="save-btn" onClick={onSave}>
                      Save
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
