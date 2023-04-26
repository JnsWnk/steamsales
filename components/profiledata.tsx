import { type } from "os";
import { ReactEventHandler, useEffect, useState } from "react";

type Props = {
  onSubmit: (value: string) => void;
  setInput: (value: string) => void;
  input: string;
  placeholder: string;
  type?: string;
};

const ProfileData = (props: Props) => {
  const [showInput, setShowInput] = useState(false);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    props.setInput(event.target.value);
  }

  function handleSubmit() {
    setShowInput(false);
    props.onSubmit(props.input);
  }

  return (
    <div className="mb-4">
      <h2 className="font-bold text-2xl mb-1">{props.placeholder}</h2>
      {showInput ? (
        <div className="flex">
          <form onSubmit={handleSubmit}>
            <input
              type={props.type ?? "text"}
              value={props.input}
              onChange={handleChange}
              className="shadow appearance-none border rounded-l py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required={true}
              pattern={
                props.type === "email"
                  ? "[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$"
                  : undefined
              }
            />
            <button
              type="submit"
              className="hover:bg-white hover:text-slate-900 border text-white rounded-r py-2 px-4 ml-1 focus:outline-none focus:shadow-outline"
            >
              Save
            </button>
          </form>
        </div>
      ) : (
        <div className="">
          <p className="font-semibold text-xl ml-2">{props.input}</p>
          <button
            onClick={() => setShowInput(true)}
            className=" hover:text-white text-gray-500 underline font-bold focus:outline-none focus:shadow-outline text-sm"
          >
            Change
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileData;
