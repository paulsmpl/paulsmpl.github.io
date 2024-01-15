/* eslint-disable react-hooks/exhaustive-deps */
import { LOCAL_KEY, NEXT_PUBLIC_API_URL, SESSION_KEY } from "@/constants";
import { Book } from "@/types/book";
import { Quote } from "@/types/quote";
import { Combobox, Dialog, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { IonIcon } from "@ionic/react";
import axios from "axios";
import { search } from "ionicons/icons";
import { Fragment, memo, useEffect, useState } from "react";
import { useLocalStorage, useSessionStorage } from "usehooks-ts";

type Props = {
  getRandomQuote: (newBookId: number) => void;
};

const Search = (props: Props) => {
  const { getRandomQuote } = props;

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [books, setBooks] = useState<Book[]>([]);
  const [selected, setSelected] = useState<Book>(books[0]);
  const [query, setQuery] = useState<string>("");
  const [localLastQuote, setLocalLastQuote] = useLocalStorage(
    LOCAL_KEY.LAST_QUOTE,
    ""
  );
  const [_, setQuotesHistory] = useSessionStorage(SESSION_KEY.QUOTES, "");

  const filteredBook =
    query === ""
      ? books
      : books.filter((book) =>
          book.bookName
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  const getSelectedBook = () => {
    if (localLastQuote) {
      const lastQuote: Quote = JSON.parse(localLastQuote);
      if (lastQuote?.book) {
        setSelected(lastQuote?.book);
      }
    }
  };

  const getBooks = () => {
    axios
      .get(`${NEXT_PUBLIC_API_URL}/book/all`)
      .then((res) => {
        if (res.status === 200) {
          setBooks(res.data);
        }
      })
      .catch(() => {})
      .finally(() => {});
  };

  useEffect(() => {
    getBooks();
  }, []);

  useEffect(() => {
    getSelectedBook();
  }, [localLastQuote]);

  useEffect(() => {
    if (localLastQuote) {
      const lastQuote: Quote = JSON.parse(localLastQuote);
      if (lastQuote?.bookId != selected?.id) {
        setLocalLastQuote("");
        setQuotesHistory("");
        getRandomQuote(selected?.id);
      }
    }
  }, [selected]);

  return (
    <>
      <div
        className="flex flex-row items-center justify-end self-end cursor-pointer w-4/5"
        onClick={() => setIsOpen(true)}
      >
        <span className="text-[18px] font-bold sm:text-xl my-[10px] mr-[10px] text-right">
          {selected?.bookName ?? ""}
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
                      displayValue={(book: Book) => book.bookName}
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
                                  {book.bookName}
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

export default memo(Search);
