import "@testing-library/jest-dom";
import ModalContainer from "../ModalContainer";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FormContext, FormDispatchContext } from "../FormContext";
import { Data } from "../../api/getData";

const customRender = (ui: React.ReactNode, {providerProps, ...renderOptions}: {providerProps: {value: Data}}) => {
  return render(
    <FormDispatchContext.Provider value={jest.fn()}>
      <FormContext.Provider {...providerProps}>{ui}</FormContext.Provider>
    </FormDispatchContext.Provider>,
    renderOptions,
  )
}

const mockData = {
    nodes: [
        {
          id: "1",
          name: "Test",
          properties: { field1: "", field2: "" },
          component_id: "test",
          prerequisites: [],
        },
        {
          id: "2",
          name: "Test2",
          properties: { field1: "", field2: "" },
          component_id: "test2",
          prerequisites: ["1"],
        }
      ]
};
describe("ModalContainer", () => {
  it("should render the correct dependencies", () => {
    const { getByText } = customRender(
      <ModalContainer
        node={{ id: "2", name: "Test2", properties: {}, component_id: "test2", prerequisites: ["1"] }}
        onClose={jest.fn()}
        field="field1"
      />,
      {
        providerProps: {
          value: mockData,
        },
      }
    );

    expect(getByText("Test")).toBeInTheDocument();
  });

  it("should render a list of fields when a node is selected", async () => {
    const user = userEvent.setup()
    customRender(
      <ModalContainer
        node={{ id: "2", name: "Test2", properties: {}, component_id: "test2", prerequisites: ["1"] }}
        onClose={jest.fn()}
        field="field1"
      />,
      {
        providerProps: {
          value: mockData,
        },
      }     
    );

    await user.click(await screen.findByText("Test"));
    expect(await screen.findByText("field1")).toBeInTheDocument();
    expect(await screen.findByText("field2")).toBeInTheDocument();
  });

});
