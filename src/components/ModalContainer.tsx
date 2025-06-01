"use client";

import ModalItemComponent from "./ModalItemComponent";
import { useFormDispatchContext } from "./FormContext";
import { useState } from "react";

interface ModalContainerProps {
  node: any;
  onClose: () => void;
  field: string;
}

interface SelectedField {
  nodeId: string;
  property: string;
}

export default function ModalContainer({
  node,
  onClose,
  field,
}: ModalContainerProps) {
  const [selectedField, setSelectedField] = useState<SelectedField | null>(
    null
  );
  const [activePrereq, setActivePrereq] = useState<string | null>(null);
  const dispatch = useFormDispatchContext();

  const handlePrereqClick = (prerequisite: string) => {
    setActivePrereq(prerequisite);
  };

  return (
    <div className="flex flex-col border border-white bg-gray-600 w-fit px-4 py-2">
      <div className="text-white text-center">Prefill Form</div>
      {node.data.prerequisites.map((prerequisite: any) => (
        <ModalItemComponent
          key={prerequisite}
          isActive={activePrereq === prerequisite}
          handlePrereqClick={handlePrereqClick}
          prerequisite={prerequisite}
          onSelection={(selection: string, nodeId: string) => {
            setSelectedField({
              nodeId: nodeId,
              property: selection,
            });
          }}
        />
      ))}
      <div className="flex flex-row gap-2">
        <button className="w-fit border border-white px-2 py-1" onClick={onClose}>Close</button>
        <button
          className="w-fit border border-white px-2 py-1"
          onClick={() => {
            dispatch({
              type: "setPrefill",
            nodeId: node.id,
            name: node.data.name,
            field: field,
            value: selectedField?.property,
          });
          onClose();
        }}
      >
        Select
        </button>
      </div>
    </div>
  );
}
