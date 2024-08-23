import { fireEvent, render, screen } from "@testing-library/react";
import SearchBar from ".";

test("clears results", async () => {
  const mockSearch = jest.fn();
  render(<SearchBar onSearch={mockSearch} />);
  const clearButton = await screen.findByRole("button");
  fireEvent.click(clearButton);

  expect(mockSearch).toHaveBeenCalledWith("");
});
