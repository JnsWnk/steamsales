import { type } from "os";
import { ReactEventHandler, useEffect, useState } from "react";

type Props = {
  onSubmit: () => void;
  setInput: (value: string) => void;
  input?: string;
  placeholder: string;
  type?: string;
  text?: string;
};

const ProfileData = (props: Props) => {
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    props.setInput(event.target.value);
  }

  function handleSubmit(event: any) {
    event.preventDefault();
    if (props.input == undefined) return;
    props.onSubmit();
  }

  return (
    <div className="mb-4 w-1/2">
      <h2 className="font-bold text-2xl">{props.placeholder}</h2>
      <p className="text-slate-500">{props.text}</p>
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
    </div>
  );
};

export default ProfileData;
