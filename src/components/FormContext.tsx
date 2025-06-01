"use client";

import { createContext, Dispatch, useContext, useEffect } from "react";
import { Data, Node } from "../api/getData";
import getData from "../api/getData";
import { useReducer } from "react";

export const FormContext = createContext<Data | null>(null);
export const FormDispatchContext = createContext<Dispatch<{
  type: string;
  data?: Data;
  nodeId?: string;
  name?: string;
  field?: string;
  value?: string;
}> | null>(null);

export function useFormContext() {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormContext");
  }
  return context;
}

export function useFormDispatchContext() {
  const context = useContext(FormDispatchContext);
  if (!context) {
    throw new Error(
      "useFormDispatchContext must be used within a FormDispatchContext"
    );
  }
  return context;
}

export function FormProvider({ children }: { children: React.ReactNode }) {
  const [data, dispatch] = useReducer(dataReducer, { nodes: [] });
  const fetchData = async () => {
    const initialData = await getData();
    dispatch({ type: "initialize", data: initialData });
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <FormContext.Provider value={data}>
      <FormDispatchContext.Provider value={dispatch}>
        {children}
      </FormDispatchContext.Provider>
    </FormContext.Provider>
  );
}

// this feels wrong and makes it hard to test

function dataReducer(
  state: Data,
  action: {
    type: string;
    data?: Data;
    nodeId?: string;
    name?: string;
    field?: string;
    value?: string;
  }
) {
  switch (action.type) {
    case "setPrefill":
      return {
        ...state,
        nodes: state.nodes.map((node: Node) =>
          node.id === action.nodeId
            ? {
                ...node,
                properties: {
                  ...node.properties,
                  [action.field ?? ""]: action.name + "." + action.value,
                },
              }
            : node
        ),
      };
    case "initialize":
      return action.data ?? state;
    default:
      return state;
  }
}
