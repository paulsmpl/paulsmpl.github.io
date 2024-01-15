"use client";
import { NEXT_PUBLIC_API_URL } from "@/constants";
import { CloudArrowUpIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const Upload = () => {
  const ref = useRef<HTMLInputElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleClick = () => {
    ref.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.currentTarget.files ?? []);
    setSelectedFiles(files);
  };

  const onSave = () => {
    const formData = new FormData();
    formData.append("file", selectedFiles[0]);
    axios
      .post(`${NEXT_PUBLIC_API_URL}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setSelectedFiles([]);
          toast("Update successful", {
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
        }
      })
      .catch(() => {
        toast("Update failed", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          type: "error",
          icon: true,
        });
      })
      .finally(() => {});
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between relative bg-gray-500">
      <div className="justify-center items-center h-screen flex">
        <div className="m-auto sm:w-[598px] p-5 rounded bg-white shadow-xl flex flex-col justify-center">
          <label className="block text-gray-700 text-base lg:text-2xl font-bold mb-4">
            Upload SQLite file
          </label>
          <div className="flex flex-row items-center">
            <div
              className="p-4 w-full flex flex-col items-center gap-2 bg-violet-50 text-black rounded-lg hover:bg-violet-100 cursor-pointer"
              onClick={handleClick}
            >
              <CloudArrowUpIcon className="w-6 h-6" />
              <span className="text-sm lg:text-2xl">
                Choose SQLite file to upload
              </span>
              <input
                type="file"
                ref={ref}
                className="hidden"
                accept=".sqlite"
                onChange={handleChange}
              />
            </div>
          </div>
          {!!selectedFiles.length && (
            <div className="p-4 mt-4 bg-violet-50 overflow-hidden text-ellipsis rounded-lg">
              {selectedFiles.map((file, i) => {
                return (
                  <span key={i} className="text-black whitespace-nowrap">
                    {file.name}
                  </span>
                );
              })}
            </div>
          )}
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

export default Upload;
