type Props = {
  text: string;
  onClick: () => void;
};

export default function Button(props: Props) {
  return (
    <div>
      <button
        className="bg-white text-slate-700 font-semibold p-3 rounded-lg mb-1 hover:bg-slate-300"
        onClick={props.onClick}
      >
        {props.text}
      </button>
    </div>
  );
}
