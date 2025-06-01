"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import ModalContainer from "./ModalContainer";
import { useFormContext } from "./FormContext";
import { Data, Node } from "../api/getData";

function getNodeFieldsByNodeId(data: Data, nodeId: string) {
  const node = data.nodes.find((node: Node) => node.id === nodeId);
  if (!node) {
    throw new Error("could not find node by id");
  }
  return node.properties;
}

export default function FormFieldComponent({
  field,
  node,
  isActive,
  handleFieldComponentClick,
}: {
  field: string;
  node: Node;
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
  }, [showModal, data, field, node.id]);
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
