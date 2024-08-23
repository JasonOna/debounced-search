import { render, screen, waitFor } from "@testing-library/react";
import useProductQuery from "./useProduct";

jest.mock('@/utils/debouncer')

const TestComponent = ({
  query,
  mockFetch = jest.fn(),
}: {
  query: string;
  mockFetch: (input: string) => Promise<Response>;
}) => {
  const { responseJSON, isLoading, error } = useProductQuery(
    query,
    mockFetch,
  );
  return (
    <div>
      <div>response is: {JSON.stringify(responseJSON)}</div>
      <div>is loading is: {JSON.stringify(isLoading)}</div>
      <div>error is: {JSON.stringify(error)}</div>
    </div>
  );
};

describe("useProductQuery", () => {
  test("hits the correct endpoint", async () => {
    const mockFetch = jest.fn();
    const query = "lego";
    const expectedUrl = "https://dummyjson.com/products/search?q=lego";

    render(<TestComponent query={query} mockFetch={mockFetch} />);

    await waitFor(async () => {
      await screen.findByText("is loading is: false");
    });

    expect(mockFetch).toHaveBeenCalledWith(expectedUrl);
  });

  test("does not hit the endpoint if the query is ''", async () => {
    const mockFetch = jest.fn();
    const query = "";

    render(<TestComponent query={query} mockFetch={mockFetch} />);

    await waitFor(async () => {
      await screen.findByText("is loading is: false");
    });

    expect(mockFetch).not.toHaveBeenCalled();
  });

  test("returns the response when fetch is successful", async () => {
    const mockFetch = jest.fn();
    mockFetch.mockResolvedValue({ json: () => "mockResponse" });
    const query = "any";

    render(<TestComponent query={query} mockFetch={mockFetch} />);

    await waitFor(async () => {
      await screen.findByText("is loading is: false");
    });

    await waitFor(async () => {
      await screen.findByText('response is: "mockResponse"');
    });
  });

  test("returns error when fetch errors", async () => {
    const mockFetch = jest.fn();
    mockFetch.mockImplementation(() => {
      throw new Error("Oh my!");
    });
    const query = "any";

    render(<TestComponent query={query} mockFetch={mockFetch} />);

    await waitFor(async () => {
      await screen.findByText("is loading is: false");
    });

    await waitFor(async () => {
      await screen.findByText('error is: "something went wrong"');
    });
  });
});
