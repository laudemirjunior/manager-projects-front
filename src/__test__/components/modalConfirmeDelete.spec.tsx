import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import ModalConfirmeDelete from "../../components/modalConfirmeDelete";

it("shold be able to render modalConfirmeDelete", async () => {
  render(
    <Router>
      <ModalConfirmeDelete
        show={true}
        setShow={function (data: boolean): void {
          throw new Error("Function not implemented.");
        }}
        id={""}
        text={""}
        action={function (id: string): void {
          throw new Error("Function not implemented.");
        }}
      />
    </Router>
  );

  expect(screen.getByText("Confirmar exclusão")).toBeInTheDocument();
});
