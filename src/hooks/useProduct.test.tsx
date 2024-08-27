import { renderHook, waitFor } from "@testing-library/react";
import useProductQuery from "./useProduct";

jest.mock("@/utils/debouncer");

describe("useProductQuery", () => {
  test("hits the correct endpoint", async () => {
    const mockFetch = jest.fn();
    const query = "lego";
    const expectedUrl = "https://dummyjson.com/products/search?q=lego";

    const { result } = renderHook(() => useProductQuery(query, mockFetch));

    await waitFor(async () => {
      expect(result.current.isLoading).toEqual(false);
    });

    expect(mockFetch).toHaveBeenCalledWith(expectedUrl);
  });

  test("does not hit the endpoint if the query is ''", async () => {
    const mockFetch = jest.fn();
    const query = "";

    const { result } = renderHook(() => useProductQuery(query, mockFetch));

    await waitFor(async () => {
      expect(result.current.isLoading).toEqual(false);
    });

    expect(mockFetch).not.toHaveBeenCalled();
  });

  test("returns the response when fetch is successful", async () => {
    const mockFetch = jest.fn();
    mockFetch.mockResolvedValue({ json: () => "mockResponse" });
    const query = "any";

    const { result } = renderHook(() => useProductQuery(query, mockFetch));

    await waitFor(async () => {
      expect(result.current.isLoading).toEqual(false);
    });

    expect(result.current.responseJSON).toEqual("mockResponse");
    expect(result.current.error).toBeNull();
  });

  test("returns error when fetch errors", async () => {
    const mockFetch = jest.fn();
    mockFetch.mockImplementation(() => {
      throw new Error("Oh my!");
    });
    const query = "any";

    const { result } = renderHook(() => useProductQuery(query, mockFetch));

    await waitFor(async () => {
      expect(result.current.isLoading).toEqual(false);
    });

    expect(result.current.error).toEqual("something went wrong");
    expect(result.current.responseJSON).toBeNull();
  });
});
