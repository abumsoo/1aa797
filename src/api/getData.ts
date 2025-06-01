const URL = "http://localhost:3000";
const TID = "1";
const BPID = "bp_01jk766tckfwx84xjcxazggzyc";

export interface Data {
  nodes: Node[];
}

export interface Node {
  id: string;
  name: string;
  component_id: string;
  prerequisites: string[];
  properties: Record<string, string>;
}

export default async function getData(): Promise<Data> {
  const response = await fetch(
    `${URL}/api/v1/${TID}/actions/blueprints/${BPID}/graph`
  );
  const data = await response.json();
  return associateFormFields(data);
}

export function associateFormFields(data: any): Data {
  const newData: Data = { nodes: [] };
  newData.nodes = data.nodes.map((node: any) => {
    const properties = data.forms.find(
      (form: any) => form.id === node.data.component_id
    ).field_schema.properties;
    return {
      id: node.id,
      name: node.data.name,
      component_id: node.data.component_id,
      prerequisites: node.data.prerequisites,
      properties: Object.entries(properties).reduce(
        (acc: any, entry: [string, any]) => {
          acc[entry[0]] = "";
          return acc;
        },
        {}
      ),
    };
  });
  return newData;
}
