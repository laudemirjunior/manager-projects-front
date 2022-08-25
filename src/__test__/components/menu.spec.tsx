import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { BrowserRouter as Router } from "react-router-dom";
import Menu from "../../components/menu";
import { ProjectContext, ProjectProvider } from "../../context/project";
const apiMock = new MockAdapter(axios);

const fakeProjects = [
  {
    id: "0c7f03b0-6623-41e5-8916-997b1663ae24",
    name: "Test 1",
  },
  {
    id: "10b75ea7-f31b-4b6b-9144-6a3900f24b3c",
    name: "Test 2",
  },
  {
    id: "72d3acf9-f82a-4267-86d2-b63a0214421f",
    name: "Test 3",
  },
];

it("shold be able to render menu", async () => {
  apiMock.onGet("/characters").replyOnce(200, fakeProjects);

  render(
    <Router>
      <ProjectProvider>
        <ProjectContext.Consumer>
          {(value: any) => <Menu />}
        </ProjectContext.Consumer>
      </ProjectProvider>
    </Router>
  );
  await waitFor(() => {
    expect(screen.getByText("Home")).toBeInTheDocument();
  });
  await waitFor(() => {
    expect(screen.getByText("+ New Project")).toBeInTheDocument();
  });
  await waitFor(() => {
    expect(screen.getByText("Home")).toBeInTheDocument();
  });
  await waitFor(() => {
    expect(screen.getByText("Projetos")).toBeInTheDocument();
  });
  setTimeout(() => {
    expect(screen.getByText("Test 1")).toBeInTheDocument();
    expect(screen.getByText("Test 2")).toBeInTheDocument();
    expect(screen.getByText("Test 3")).toBeInTheDocument();
  }, 1000);
});
