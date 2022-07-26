import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders add product title", () => {
  render(<App />);
  const titleElement = screen.getByText(/Let's add your internal tools/i);
  expect(titleElement).toBeInTheDocument();
});

test("renders 1 of 3 label", () => {
  render(<App />);
  const labelElement = screen.getByText(/1 of 3/i);
  expect(labelElement).toBeInTheDocument();
});

test("renders 0 products added text", () => {
  render(<App />);
  const labelElement = screen.getByText(/0 Products Added/i);
  expect(labelElement).toBeInTheDocument();
});
