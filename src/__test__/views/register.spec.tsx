import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Register from "../../views/register";

it("shold be able to render menu", async () => {
  render(
    <Router>
      <Register />
    </Router>
  );

  expect(screen.getByText("Nome")).toBeInTheDocument();
  expect(screen.getByText("E-mail")).toBeInTheDocument();
  expect(screen.getByText("Senha")).toBeInTheDocument();
  expect(screen.getByText("Confirmação de senha")).toBeInTheDocument();
  expect(screen.getByText("Não possui conta?")).toBeInTheDocument();
});
