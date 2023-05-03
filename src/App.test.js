import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";


test("renders logo in login component", () => {
  render(<App  />);
  const image = screen.getByAltText("basic-column");
  expect(image).toBeInTheDocument();
 
})



