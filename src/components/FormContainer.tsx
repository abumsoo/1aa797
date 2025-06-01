"use client";
import { useState } from "react";
import FormComponent from "./FormComponent";
import { useFormContext } from "./FormContext";
import { Node } from "../api/getData";

export default function FormContainer() {
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(null);

  const handleComponentClick = (id: string | null) => {
    setSelectedComponentId(id === selectedComponentId ? null : id);
  };

  const data = useFormContext();

  return (
    <div>
      {data.nodes.map((node: Node) => (
        selectedComponentId === null || node.id === selectedComponentId ? (
          <FormComponent
            key={node.id}
            node={node}
            selectedComponentId={selectedComponentId}
            setShowSelectedComponent={handleComponentClick}
          />
        ) : null
      ))}
    </div>
  );
}