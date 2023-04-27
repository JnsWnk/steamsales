type Props = {
  text: string;
};

export default function Paragraph(props: Props) {
  return (
    <div>
      <p className="font-medium text-lg text-slate-500 mb-1">{props.text}</p>
    </div>
  );
}
