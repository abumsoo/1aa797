import getData, { associateFormFields } from "../getData";

const mockData = {
  nodes: [
    {
      id: "1",
      data: {
        component_id: "form_1",
        name: "Node 1",
        prerequisites: []
      },
    },
    {
      id: "2",
      data: {
        name: "Node 2",
        component_id: "form_2",
        prerequisites: []
      }
    }
  ],
  forms: [
    {
      id: "form_1",
      field_schema: {
        properties: {
          field1: {},
          field2: {}
        }
      }
    },
    {
      id: "form_2",
      field_schema: {
        properties: {
          field3: {}
        }
      }
    }
  ]
};

describe("getData", () => {
  let originalFetch: any;

  beforeEach(() => {
    originalFetch = global.fetch;
    global.fetch = jest.fn();
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it("should fetch and process data correctly", async () => {
    const mockResponse = {
      json: jest.fn().mockResolvedValue(mockData)
    };
    
    (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

    const result = await getData();

    expect(global.fetch).toHaveBeenCalledWith(
      "http://localhost:3000/api/v1/1/actions/blueprints/bp_01jk766tckfwx84xjcxazggzyc/graph"
    );
    expect(result).toEqual({
      nodes: [
        {
          id: "1",
          name: "Node 1",
          component_id: "form_1",
          prerequisites: [],
          properties: {
            field1: "",
            field2: ""
          }
        },
        {
          id: "2",
          name: "Node 2",
          component_id: "form_2",
          prerequisites: [],
          properties: {
            field3: ""
          }
        }
      ]
    });
  });

  it("should handle fetch errors", async () => {
    const error = new Error("Network error");
    (global.fetch as jest.Mock).mockRejectedValue(error);

    await expect(getData()).rejects.toThrow("Network error");
  });

  it("should handle invalid JSON response", async () => {
    const mockResponse = {
      json: jest.fn().mockRejectedValue(new Error("Invalid JSON"))
    };
    (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

    await expect(getData()).rejects.toThrow("Invalid JSON");
  });
});

// Test the helper function separately
describe("associateFormFields", () => {
  it("should associate form fields correctly", () => {
    const result = associateFormFields(mockData);
    
    expect(result).toEqual({
      nodes: [
        {
          id: "1",
          name: "Node 1",
          component_id: "form_1",
          prerequisites: [],
          properties: {
            field1: "",
            field2: ""
          }
        },
        {
          id: "2",
          name: "Node 2",
          component_id: "form_2",
          prerequisites: [],
          properties: {
            field3: ""
          }
        }
      ]
    });
  });
});