import { render, screen } from "@testing-library/react";
import Button from "../../components/button";

it("shold be able to render button", async () => {
  render(<Button name="Button" />);

  expect(screen.getByText("Button")).toBeInTheDocument();
});
