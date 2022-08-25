import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Bar from "../../components/bar";

it("shold be able to render bar", async () => {
  render(
    <Router>
      <Bar />
    </Router>
  );

  expect(screen.getByText("Home")).toBeInTheDocument();
});
