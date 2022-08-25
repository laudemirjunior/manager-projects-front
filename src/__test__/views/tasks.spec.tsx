import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { ProjectContext, ProjectProvider } from "../../context/project";
import { TaskProvider } from "../../context/task";
import { UserProvider } from "../../context/user";
import Tasks from "../../views/tasks";

it("shold be able to render menu", async () => {
  render(
    <Router>
      <UserProvider>
        <ProjectProvider>
          <TaskProvider>
            <ProjectContext.Consumer>
              {(value: any) => <Tasks />}
            </ProjectContext.Consumer>
          </TaskProvider>
        </ProjectProvider>
      </UserProvider>
    </Router>
  );
  expect(screen.getByText("Delete project")).toBeInTheDocument();
  expect(screen.getByText("Todos")).toBeInTheDocument();
  expect(screen.getByText("Vencidas")).toBeInTheDocument();
  expect(screen.getByText("Pendentes")).toBeInTheDocument();
  expect(screen.getByText("Concluídas")).toBeInTheDocument();
});
