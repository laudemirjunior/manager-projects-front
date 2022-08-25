import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { ProjectContext, ProjectProvider } from "../../context/project";
import { UserProvider } from "../../context/user";
import Dashboard from "../../views/dashboard";

it("shold be able to render menu", async () => {
  render(
    <Router>
      <UserProvider>
        <ProjectProvider>
          <ProjectContext.Consumer>
            {(value: any) => <Dashboard />}
          </ProjectContext.Consumer>
        </ProjectProvider>
      </UserProvider>
    </Router>
  );
  expect(screen.getByText("Olá")).toBeInTheDocument();
  expect(screen.getByText("Total de projetos")).toBeInTheDocument();
  expect(screen.getByText("Projetos")).toBeInTheDocument();
});
