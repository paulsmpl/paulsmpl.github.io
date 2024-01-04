/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import Colors from "@/components/Colors";
import Content from "@/components/Content";
import Header from "@/components/Header";
import { COLORS, LOCAL_KEY, SESSION_KEY } from "@/constants";
import { Quote } from "@/types/quote";
import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { useCountdown, useLocalStorage, useSessionStorage } from "usehooks-ts";

export default function Home() {
  const [quote, setQuote] = useState<Quote>();
  const [loading, setLoading] = useState<boolean>(true);
  const [color, setColor] = useState<string>(COLORS[3]);
  const [localColor, setLocalColor] = useLocalStorage(LOCAL_KEY.COLOR, color);
  const [localLastQuote, setLocalLastQuote] = useLocalStorage(
    LOCAL_KEY.LAST_QUOTE,
    ""
  );
  const [localCountDown] = useLocalStorage(LOCAL_KEY.COUNT_DOWN, "10");
  const [count, { startCountdown, stopCountdown, resetCountdown }] =
    useCountdown({
      countStart: Number(localCountDown),
    });
  const [quotesHistory, setQuotesHistory] = useSessionStorage(
    SESSION_KEY.QUOTES,
    ""
  );
  const [indexQuotesHistory, setIndexQuotesHistory] = useState<number>(
    quotesHistory ? JSON.parse(quotesHistory).length - 1 : 0
  );
  const [pauseCountdown, setPauseCountdown] = useState<boolean>(false);

  const onChangeColor = (_color: string) => {
    setColor(_color);
    setLocalColor(_color);
  };

  const getRandomQuote = () => {
    setLoading(true);
    let params = {};

    if (localLastQuote) {
      params = {
        ...params,
        currerntQuoteId: JSON.parse(localLastQuote)?.id,
      };
    }
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/quote/random`, { params })
      .then((res) => {
        if (res.status === 200) {
          setQuote(res.data);
          let index = 0;
          setQuotesHistory((quotesHistory) => {
            let _quotesHistory: Quote[];
            if (quotesHistory) {
              _quotesHistory = [...JSON.parse(quotesHistory), res.data];
            } else {
              _quotesHistory = [res.data];
            }
            index = _quotesHistory.length - 1;
            return JSON.stringify(_quotesHistory);
          });
          setIndexQuotesHistory(index);
        }
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false);
      });
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    switch (event.key) {
      case "ArrowLeft":
        if (quotesHistory && indexQuotesHistory > 0) {
          const _quotesHistory: Quote[] = JSON.parse(quotesHistory);
          const _indexQuotesHistory = indexQuotesHistory - 1;
          setQuote(_quotesHistory[_indexQuotesHistory]);
          setIndexQuotesHistory(_indexQuotesHistory);
        }
        break;
      case "ArrowRight":
        if (
          quotesHistory &&
          indexQuotesHistory < JSON.parse(quotesHistory).length - 1
        ) {
          const _quotesHistory: Quote[] = JSON.parse(quotesHistory);
          const _indexQuotesHistory = indexQuotesHistory + 1;
          setQuote(_quotesHistory[_indexQuotesHistory]);
          setIndexQuotesHistory(_indexQuotesHistory);
        } else {
          getRandomQuote();
        }
        break;
      case "d":
        if (pauseCountdown) {
          startCountdown();
        } else {
          stopCountdown();
        }
        setPauseCountdown(!pauseCountdown);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress, false);

    return () => {
      document.removeEventListener("keydown", handleKeyPress, false);
    };
  }, [handleKeyPress]);

  useEffect(() => {
    if (localColor) {
      setColor(localColor);
    }
  }, [localColor]);

  useEffect(() => {
    getRandomQuote();
    startCountdown();
  }, []);

  useEffect(() => {
    if (count === 0) {
      getRandomQuote();
      resetCountdown();
      startCountdown();
    }
  }, [count]);

  useEffect(() => {
    setLocalLastQuote(JSON.stringify(quote));
  }, [quote]);

  return (
    <main
      className="flex min-h-screen flex-col items-center justify-between relative"
      style={{ backgroundColor: color }}
    >
      <Header />
      <Content
        color={color}
        loading={loading}
        quote={quote}
        getRandomQuote={getRandomQuote}
      />
      <Colors onChangeColor={onChangeColor} />
      <ToastContainer />
    </main>
  );
}
