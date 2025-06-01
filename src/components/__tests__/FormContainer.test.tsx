import "@testing-library/jest-dom";
import { render, screen, within } from "@testing-library/react";
import FormContainer from "../FormContainer";
import userEvent from "@testing-library/user-event";
import { FormContext, FormDispatchContext } from "../FormContext";
import { Data } from "../../api/getData";

/**
 * A custom render to setup providers. Extends regular
 * render options with `providerProps` to allow injecting
 * different scenarios to test with.
 *
 * @see https://testing-library.com/docs/react-testing-library/setup#custom-render
 */
const customRender = (ui: React.ReactNode, {providerProps, ...renderOptions}: {providerProps: {value: Data}}) => {
  return render(
    <FormContext.Provider {...providerProps}>
      <FormDispatchContext.Provider value={jest.fn()}>{ui}</FormDispatchContext.Provider>
    </FormContext.Provider>,
    renderOptions,
  )
}
describe("FormContainer", () => {
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
    }
  it("should render the correct fields when name is clicked", async () => {
    const user = userEvent.setup()
    customRender(
      <FormContainer
      />,
    {
      providerProps: {
        value: mockData
      }
    }
    );
    expect(screen.queryByText("field1")).not.toBeInTheDocument();
    await user.click(await screen.findByText("Test"));
    expect(await screen.findByText("field1")).toBeInTheDocument();
    expect(await screen.findByText("field2")).toBeInTheDocument();
  });

  it("should render a modal when a field is clicked", async () => {
    customRender(
      <FormContainer
      />,
    {
      providerProps: {
        value: mockData
      }
    }
    );
    const user = userEvent.setup()
    expect(screen.queryByText("Prefill Form")).not.toBeInTheDocument();
    await user.click(await screen.findByText("Test"));
    await user.click(await screen.findByText("field1"));
    expect(await screen.findByText("Prefill Form")).toBeInTheDocument();
  });

  // TODO: need to figure out a way to test context + reducer
  // clues here perhaps
  // https://stackoverflow.com/questions/63142322/how-to-test-react-usecontext-usereducer-dispatch-in-component
  it.skip("should set prefill data when select is clicked", async () => {
    const user = userEvent.setup()
    customRender(
      <FormContainer
      />,
    {
      providerProps: {
        value: mockData
      }
    }
    );
    await user.click(await screen.findByText("Test2"));
    await user.click(await screen.findByText("field1"));
    
    const withinModal = within(screen.getByTestId("modal-container"))

    await user.click(await withinModal.findByText("Test"));
    await user.click(await withinModal.findByText("field1"));
    await user.click(await withinModal.findByText("Select"));
    screen.debug()
    expect(await screen.findByText("Test.field1")).toBeInTheDocument();
  });
});