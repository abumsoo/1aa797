"use client";

import { useContext, useState } from "react";
import { FormContext } from "./FormContext";
import { Data, Node } from "../api/getData";

interface ModalItemComponentProps {
  prerequisite: string;
  onSelection: (selection: string, nodeId: string, nodeName: string) => void;
  handlePrereqClick: (prerequisite: string) => void;
  isActive: boolean;
}

function getNodeNameById(data: Data, nodeId: string) {
  return data.nodes.find((node: Node) => node.id === nodeId)?.name;
}

function getNodeFieldsByNodeId(data: Data, nodeId: string) {
  const node = data.nodes.find((node: Node) => node.id === nodeId);
  return Object.keys(node?.properties || {});
}

export default function ModalItemComponent({
  prerequisite,
  onSelection,
  handlePrereqClick,
  isActive,
}: ModalItemComponentProps) {
  const [showSubItems, setShowSubItems] = useState(false);
  const [activeField, setActiveField] = useState<string | null>(null);
  const data = useContext(FormContext);
  if (!data) {
    throw new Error("cannot retrieve data from modal item component");
  }
  const nodeName = getNodeNameById(data, prerequisite)
  return (
    <div>
      <div
        className={`cursor-pointer ${isActive ? "bg-gray-700" : ""}`}
        onClick={() => {
          setShowSubItems(!showSubItems);
          handlePrereqClick(prerequisite);
        }}
      >
        {nodeName}
      </div>
      {showSubItems && isActive &&
        getNodeFieldsByNodeId(data, prerequisite).map((field: string) => (
          <div
            key={field}
            onClick={() => {
              onSelection(field, prerequisite, nodeName ?? '');
              setActiveField(field);
            }}
            className={`cursor-pointer ${activeField === field ? "bg-gray-700" : ""}`}
          >
            {field}
          </div>
        ))}
    </div>
  );
}
