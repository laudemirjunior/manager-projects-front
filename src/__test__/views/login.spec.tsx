import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Login from "../../views/login";

it("shold be able to render menu", async () => {
  render(
    <Router>
      <Login />
    </Router>
  );

  expect(screen.getByText("E-mail")).toBeInTheDocument();
  expect(screen.getByText("Senha")).toBeInTheDocument();
  expect(screen.getByText("Já possui conta?")).toBeInTheDocument();
});
