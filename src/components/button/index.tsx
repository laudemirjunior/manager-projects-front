import "./stles.scss";

interface PropsButton {
  name: string;
  onClick?: () => void;
  type?: any;
}

export default function Button({ name, onClick, type }: PropsButton) {
  return (
    <button className="button" onClick={onClick} type={type}>
      {name}
    </button>
  );
}
