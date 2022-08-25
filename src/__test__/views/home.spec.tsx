import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Home from "../../views/home";

it("shold be able to render menu", async () => {
  render(
    <Router>
      <Home />
    </Router>
  );
  expect(
    screen.getByText("Gerenciador de Projetos e Tarefas")
  ).toBeInTheDocument();
  expect(
    screen.getByText(
      "Utilize está aplicação para gerenciamento de projetos, permitindo que se possa organizar as atividades que serão executadas e as que já foram concluídas nos projetos em andamento."
    )
  ).toBeInTheDocument();
});
