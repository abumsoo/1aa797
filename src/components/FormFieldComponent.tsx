"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import ModalContainer from "./ModalContainer";
import { useFormContext } from "./FormContext";

function getNodeFieldsByNodeId(data: any, nodeId: string) {
  const node = data.nodes.find((node: any) => node.id === nodeId);
  return node.properties;
}

export default function FormFieldComponent({
  field,
  node,
  isActive,
  handleFieldComponentClick,
}: {
  field: string;
  node: any;
  isActive: boolean;
  handleFieldComponentClick: (id: string | null) => void;
}) {
  const [showModal, setShowModal] = useState(false);
  const [selection, setSelection] = useState<string>(field)
  const data = useFormContext();

  useEffect(() => {
    if (!showModal) {
      const fields = getNodeFieldsByNodeId(data, node.id);
      setSelection(fields[field] === "" ? field : `${field}: ${fields[field]}`);
    }
  }, [showModal, data]);
  return (
    <div>
      <div
        onClick={() => {
          setShowModal(!showModal);
          handleFieldComponentClick(field);
        }}
        className={`cursor-pointer ${isActive ? "bg-gray-700" : ""}`}
      >
        {selection}
      </div>

      {showModal && isActive &&
        createPortal(
          <ModalContainer
            node={node}
            field={field}
            onClose={() => setShowModal(false)}
          />,
          document.body
        )}
    </div>
  );
}
