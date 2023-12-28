import { Book } from "@/types/book";
import { Combobox, Dialog, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { IonIcon } from "@ionic/react";
import { search } from "ionicons/icons";
import { Fragment, useState } from "react";

const books = [
  { id: 1, name: "Opponent Of Silver" },
  { id: 2, name: "Giants Of Wood" },
  { id: 3, name: "Swindlers And Wives" },
  { id: 4, name: "Vultures And Priests" },
  { id: 5, name: "Will Without Glory" },
  { id: 6, name: "Moon With A Goal" },
  { id: 7, name: "Blinded In The Champions" },
  { id: 8, name: "Whispers In The City" },
];

const Search = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<Book>(books[0]);
  const [query, setQuery] = useState<string>("");

  const filteredBook =
    query === ""
      ? books
      : books.filter((book) =>
          book.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <>
      <div
        className="flex flex-row items-center self-end cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <span className="text-[18px] font-bold sm:text-xl my-[10px] mr-[10px]">
          {selected.name}
        </span>
        <IonIcon
          icon={search}
          style={{ color: "white" }}
          className="w-[24px] h-[24px]"
        />
      </div>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Dialog.Panel className="mx-auto w-[90%] sm:w-[500px] rounded bg-white p-6 text-left align-middle shadow-xl transition-all">
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900 mb-3"
              >
                Change book
              </Dialog.Title>
              <Combobox value={selected} onChange={setSelected}>
                <div className="relative mt-1">
                  <div className="relative w-full cursor-default  rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                    <Combobox.Input
                      className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                      displayValue={(book: Book) => book.name}
                      onChange={(event) => setQuery(event.target.value)}
                    />
                    <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                      <ChevronUpDownIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </Combobox.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    afterLeave={() => setQuery("")}
                  >
                    <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                      {filteredBook.length === 0 && query !== "" ? (
                        <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                          Nothing found.
                        </div>
                      ) : (
                        filteredBook.map((book) => (
                          <Combobox.Option
                            key={book.id}
                            className={({ active }) =>
                              `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                active
                                  ? "bg-teal-600 text-white"
                                  : "text-gray-900"
                              }`
                            }
                            value={book}
                          >
                            {({ selected, active }) => (
                              <>
                                <span
                                  className={`block truncate ${
                                    selected ? "font-medium" : "font-normal"
                                  }`}
                                >
                                  {book.name}
                                </span>
                                {selected ? (
                                  <span
                                    className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                      active ? "text-white" : "text-teal-600"
                                    }`}
                                  >
                                    <CheckIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Combobox.Option>
                        ))
                      )}
                    </Combobox.Options>
                  </Transition>
                </div>
              </Combobox>
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default Search;
