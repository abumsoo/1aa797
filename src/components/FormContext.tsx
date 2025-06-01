"use client";

import { createContext, Dispatch, useContext } from "react";
import { Data } from "../api/getData";
import getData from "../api/getData";
import { useReducer } from "react";

export const FormContext = createContext<Data | null>(null);
export const FormDispatchContext = createContext<Dispatch<any> | null>(null);

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
    throw new Error("useFormDispatchContext must be used within a FormDispatchContext");
  }
  return context;
}

export function FormProvider({children}: {children: React.ReactNode}) {
  const [data, dispatch] = useReducer(dataReducer, initialData);
  return (
    <FormContext.Provider value={data}>
      <FormDispatchContext.Provider value={dispatch}>
        {children}
      </FormDispatchContext.Provider>
    </FormContext.Provider>
  );
}

const initialData = await getData()

function dataReducer(state: Data, action: any) {
  switch (action.type) {
    case "setPrefill":
      return {
        ...state,
        nodes: state.nodes.map((node: any) =>
          node.id === action.nodeId
            ? {
                ...node,
                properties: {
                  ...node.properties,
                  [action.field]: action.name + "." + action.value,
                },
              }
            : node
        ),
      };
    default:
      return state;
  }
}