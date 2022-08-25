import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import ModalCreateTask from "../../components/modalCreateTask";

it("shold be able to render modalCreateTask", async () => {
  render(
    <Router>
      <ModalCreateTask
        show={true}
        setShow={function (data: boolean): void {
          throw new Error("Function not implemented.");
        }}
        id={""}
      />
    </Router>
  );

  expect(screen.getByText("Criar task")).toBeInTheDocument();
  expect(screen.getByText("Nome")).toBeInTheDocument();
  expect(screen.getByText("Responsável")).toBeInTheDocument();
  expect(screen.getByText("Entrega")).toBeInTheDocument();
  expect(screen.getByText("Concluída")).toBeInTheDocument();
  expect(screen.getByText("Não")).toBeInTheDocument();
});
