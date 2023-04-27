type Props = {
  text: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
};

export default function Button(props: Props) {
  return (
    <div>
      <button
        className="bg-white text-slate-700 font-semibold p-3 rounded-lg hover:bg-slate-300"
        onClick={props.onClick}
        type={props.type}
      >
        {props.text}
      </button>
    </div>
  );
}
