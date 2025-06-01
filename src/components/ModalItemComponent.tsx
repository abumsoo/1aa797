"use client";

import { useContext, useState } from "react";
import { FormContext } from "./FormContext";

interface ModalItemComponentProps {
  prerequisite: string;
  onSelection: (selection: string, nodeId: string) => void;
  handlePrereqClick: (prerequisite: string) => void;
  isActive: boolean;
}

function getNodeNameById(data: any, nodeId: string) {
  return data.nodes.find((node: any) => node.id === nodeId)?.data.name;
}

function getNodeFieldsByNodeId(data: any, nodeId: string) {
  const node = data.nodes.find((node: any) => node.id === nodeId);
  return Object.keys(node.properties);
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
        getNodeFieldsByNodeId(data, prerequisite).map((field: any) => (
          <div
            key={field}
            onClick={() => {
              onSelection(field, prerequisite);
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
