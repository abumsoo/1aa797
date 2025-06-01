"use client";

import ModalItemComponent from "./ModalItemComponent";
import { useFormDispatchContext } from "./FormContext";
import { useState } from "react";
import { Node } from "../api/getData";

interface ModalContainerProps {
  node: Node;
  onClose: () => void;
  field: string;
}

interface SelectedField {
  nodeId: string;
  property: string;
  name: string;
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
    // I don't love adding testids, but for the sake of some quick testing
    <div data-testid="modal-container" className="flex flex-col border border-white bg-gray-600 w-fit px-4 py-2">
      <div className="text-white text-center">Prefill Form</div>
      {node.prerequisites.map((prerequisite: string) => (
        <ModalItemComponent
          key={prerequisite}
          isActive={activePrereq === prerequisite}
          handlePrereqClick={handlePrereqClick}
          prerequisite={prerequisite}
          onSelection={(selection: string, nodeId: string, nodeName: string) => {
            setSelectedField({
              nodeId: nodeId,
              property: selection,
              name: nodeName,
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
              name: selectedField?.name,
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
