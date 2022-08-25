import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import ModalCreateProject from "../../components/modalCreateProject";

it("shold be able to render modalCreateProject", async () => {
  render(
    <Router>
      <ModalCreateProject
        show={true}
        setShow={function (data: boolean): void {
          throw new Error("Function not implemented.");
        }}
      />
    </Router>
  );

  expect(screen.getByText("Nome")).toBeInTheDocument();
});
