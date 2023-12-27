"use client";
import { faQuoteLeft, faQuoteRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IonIcon } from "@ionic/react";
import classnames from "classnames";
import {
  addCircleOutline,
  copyOutline,
  logoTwitter,
  volumeMediumOutline,
} from "ionicons/icons";
import { toast } from "react-toastify";

type Props = {
  color: string;
  loading: boolean;
  content: string;
  author: string;
  getRandomQuote: () => void;
};

const Content = (props: Props) => {
  const { color, loading, content, author, getRandomQuote } = props;

  const quoteToSpeech = () => {
    const utterance = new SpeechSynthesisUtterance(
      `${content} by ${author.replace("_", "")}`
    );
    utterance.lang = "en-US";
    speechSynthesis.speak(utterance);
  };

  const onShareTwitter = () => {
    const url = `https://www.twitter.com/intent/tweet?text=${content} By ${author}`;
    window.open(url, "_blank");
  };

  const onCopy = () => {
    navigator.clipboard.writeText(content);
    toast("Quote copied to clipboard", {
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
    <div className="flex h-screen">
      <div className="m-auto w-[90%] sm:w-[598px] p-5 rounded-[10px] flex flex-col justify-center bg-[rgba(255,255,255,0.2)] backdrop-blur-[1.5px] shadow-[0_8px_32px_0px_rgba(31,38,135,0.37)] border border-[rgba(255,255,255,0.18)]">
        <span className="text-3xl font-semibold text-center mb-5">
          Quotes Generator
        </span>
        <FontAwesomeIcon
          icon={faQuoteLeft}
          className="fas fa-quote-left w-[26px] h-[30px]"
        />
        <span className="text-[18px] sm:text-xl text-center mt-[10px] pl-5">
          {content}
        </span>
        <FontAwesomeIcon
          icon={faQuoteRight}
          className="fas fa-quote-left w-[26px] h-[30px] self-end mt-[10px]"
        />
        <span className="mt-3 text-sm sm:text-[18px] italic text-end mb-5">
          {author}
        </span>
        <div className="flex flex-row items-center justify-between">
          <div className="grid grid-flow-col gap-x-5">
            <div
              className="w-9 sm:w-11 h-9 sm:h-11 rounded-full bg-white flex items-center justify-center cursor-pointer"
              onClick={quoteToSpeech}
            >
              <IonIcon
                icon={volumeMediumOutline}
                style={{ color }}
                className="w-[18px] h-[18px]"
              />
            </div>
            <div
              className="w-9 sm:w-11 h-9 sm:h-11 rounded-full bg-white flex items-center justify-center cursor-pointer"
              onClick={onShareTwitter}
            >
              <IonIcon
                icon={logoTwitter}
                style={{ color }}
                className="w-[18px] h-[18px]"
              />
            </div>
            <div
              className="w-9 sm:w-11 h-9 sm:h-11 rounded-full bg-white flex items-center justify-center cursor-pointer"
              onClick={onCopy}
            >
              <IonIcon
                icon={copyOutline}
                style={{ color }}
                className="w-[18px] h-[18px]"
              />
            </div>
          </div>
          <div
            className={classnames(
              "py-[10px] sm:py-3 px-3 sm:px-[18px] rounded-full flex flex-row items-center cursor-pointer",
              {
                "pointer-events-none": loading,
                "pointer-events-auto": !loading,
              }
            )}
            style={{ backgroundColor: color }}
            onClick={getRandomQuote}
          >
            {loading ? (
              <div className="h-[22px]">
                <span className="text-xs sm:text-[18px]">Loading...</span>
              </div>
            ) : (
              <>
                <span className="text-xs sm:text-[18px]">New Quote</span>
                <IonIcon
                  icon={addCircleOutline}
                  style={{ color: "white" }}
                  className="w-[22px] h-[22px] ml-[10px]"
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
