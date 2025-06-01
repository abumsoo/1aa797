"use client";
import FormFieldComponent from "./FormFieldComponent";
import { useState } from "react";
import { Node } from "../api/getData";

export default function FormComponent({
  node,
  selectedComponentId,
  setShowSelectedComponent,
}: {
  node: Node;
  selectedComponentId: string | null;
  setShowSelectedComponent: (id: string | null) => void;
}) {
  const [activeID, setActiveID] = useState<string | null>(null);
  const isSelected = selectedComponentId === node.id;
  const handleFieldComponentClick = (id: string | null) => {
    setActiveID(id);
  };
  const handleComponentClick = () => {
    setShowSelectedComponent(node.id);
  };
  return (
    <div className="flex flex-col border border-white bg-gray-800 my-2 w-fit p-2 rounded">
      <div
        onClick={handleComponentClick}
        key={node.id}
        className="cursor-pointer"
      >
        {node.name}
      </div>
      {isSelected &&
        Object.keys(node.properties).map((field: string) => (
          <FormFieldComponent
            key={field}
            field={field}
            node={node}
            isActive={activeID === field}
            handleFieldComponentClick={handleFieldComponentClick}
          />
        ))}
      {isSelected && (
        <div
          onClick={() => setShowSelectedComponent(null)}
          className="cursor-pointer"
        >
          Go Back
        </div>
      )}
    </div>
  );
}
