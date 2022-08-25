import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import ModalEditProject from "../../components/modalEditProject";

it("shold be able to render modalEditProject", async () => {
  render(
    <Router>
      <ModalEditProject
        show={true}
        setShow={function (data: boolean): void {
          throw new Error("Function not implemented.");
        }}
        id={""}
      />
    </Router>
  );

  expect(screen.getByText("Nome")).toBeInTheDocument();
});
