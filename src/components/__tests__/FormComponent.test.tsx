import "@testing-library/jest-dom";
import { render, waitFor } from "@testing-library/react";
import FormComponent from "../FormComponent";


describe("FormComponent", () => {
  it("should render a component with the correct name", () => {
    const { getByText } = render(
      <FormComponent
        node={{ id: "1", name: "Test", properties: {}, component_id: "test", prerequisites: [] }}
        selectedComponentId={null}
        setShowSelectedComponent={jest.fn()}
      />
    );

    waitFor(() => expect(getByText("Test")).toBeInTheDocument());
  });

});
