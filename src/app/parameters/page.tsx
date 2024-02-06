"use client";
import { LOCAL_KEY } from "@/constants";
import { Switch } from "@headlessui/react";
import { ChangeEvent, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useLocalStorage } from "usehooks-ts";

const Parameters = () => {
  const [enabledSlideshow, setEnabledSlideshow] = useLocalStorage(
    LOCAL_KEY.ENABLED_SLIDESHOW,
    "0"
  );
  const [enabled, setEnabled] = useState<boolean>(enabledSlideshow == "1");
  const [localCountDown, setLocalCountDown] = useLocalStorage(
    LOCAL_KEY.COUNT_DOWN,
    "10"
  );
  const [seconds, setSeconds] = useState<string>(localCountDown);

  const onChangeEnable = (newEnabled: boolean) => {
    setEnabled(newEnabled);
  };

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const _seconds = evt.target.validity.valid ? evt.target.value : seconds;
    setSeconds(_seconds);
  };

  const onSave = () => {
    setEnabledSlideshow(enabled ? "1" : "0");
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
            Enable slideshow
          </label>
          <Switch
            checked={enabled}
            onChange={onChangeEnable}
            className="relative inline-flex h-6 w-11 items-center rounded-full ui-checked:bg-blue-600 ui-not-checked:bg-gray-200"
          >
            <span className="inline-block h-4 w-4 transform rounded-full bg-white transition ui-checked:translate-x-6 ui-not-checked:translate-x-1" />
          </Switch>
          {enabled ? (
            <>
              <label className="block text-gray-700 text-base lg:text-2xl font-bold my-4">
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
            </>
          ) : null}
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
