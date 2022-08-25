import { render, screen } from "@testing-library/react";
import Footer from "../../components/footer";

it("shold be able to render footer", async () => {
  render(<Footer />);

  expect(screen.getByText("Laudemir")).toBeInTheDocument();
});
