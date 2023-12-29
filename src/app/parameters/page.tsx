"use client";
import { LOCAL_KEY } from "@/constants";
import { ChangeEvent, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useLocalStorage } from "usehooks-ts";

const Parameters = () => {
  const [localCountDown, setLocalCountDown] = useLocalStorage(
    LOCAL_KEY.COUNT_DOWN,
    "10"
  );
  const [seconds, setSeconds] = useState<string>(localCountDown);

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const _seconds = evt.target.validity.valid ? evt.target.value : seconds;
    setSeconds(_seconds);
  };

  const onSave = () => {
    setLocalCountDown(seconds);
    toast("Saved successfully", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      type: "success",
      icon: true,
    });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between relative bg-gray-500">
      <div className="justify-center items-center h-screen flex">
        <div className="m-auto sm:w-[598px] p-5 rounded bg-white shadow-xl flex flex-col justify-center">
          <label className="block text-gray-700 text-base lg:text-2xl font-bold mb-4">
            Time next quote
          </label>
          <input
            className="shadow appearance-none border rounded-lg w-full py-3 lg:py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Seconds"
            pattern="[0-9]*"
            value={seconds}
            onInput={handleChange}
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-fit self-end mt-5"
            onClick={onSave}
          >
            <span>Save</span>
          </button>
        </div>
        <ToastContainer />
      </div>
    </main>
  );
};

export default Parameters;
