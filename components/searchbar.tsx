import { useState } from "react";

type Props = {
  onSubmit: (value: string) => void;
  placeholder?: string;
};

const Searchbar = (props: Props) => {
  const { onSubmit, placeholder } = props;
  const [value, setValue] = useState("");

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(value);
  };

  return (
    <div className="w-full max-w-lg mx-auto my-2">
      <form onSubmit={submit}>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"></div>
          <input
            type="search"
            id="search"
            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:ring-transparent focus:outline-none focus:border-white"
            placeholder={placeholder || "Search..."}
            required
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button
            type="submit"
            className="text-white absolute right-2.5 bottom-2.5 bg-slate-800 hover:bg-white hover:text-slate-800 focus:ring-4 focus:outline-none focus:ring-black font-medium rounded-lg text-sm px-4 py-2"
          >
            Go
          </button>
        </div>
      </form>
    </div>
  );
};

export default Searchbar;
