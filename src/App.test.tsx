import { render, screen } from "@testing-library/react";
import App from "./App";

test("is has the right copy", async () => {
  render(<App />);

  expect(await screen.findByText("Hello world!")).toBeTruthy();
});
