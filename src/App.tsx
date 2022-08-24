import { BrowserRouter } from "react-router-dom";
import { AppProvider } from "./context";
import Router from "./routes";
import "./styles/styles.scss";

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Router />
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
