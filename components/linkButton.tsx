import Link from "next/link";

type Props = {
  text: string;
  href: string;
};

export default function LinkButton(props: Props) {
  return (
    <div>
      <Link
        className="bg-white text-slate-700 font-semibold p-3 rounded-lg hover:bg-slate-300"
        href={props.href}
      >
        {props.text}
      </Link>
    </div>
  );
}
