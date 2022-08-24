import { useNavigate } from "react-router";
import "./styles.scss";

export default function Bar() {
  const navigate = useNavigate();

  return (
    <div className="container-bar">
      <div>
        <b onClick={() => navigate("/")}>Home</b>
      </div>
    </div>
  );
}
