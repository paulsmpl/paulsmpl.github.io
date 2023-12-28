"use client";
import Colors from "@/components/Colors";
import Content from "@/components/Content";
import Header from "@/components/Header";
import { COLORS, LOCAL_KEY, SESSION_KEY } from "@/constants";
import { Quote } from "@/types/quote";
import { useCallback, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { useCountdown, useLocalStorage, useSessionStorage } from "usehooks-ts";

export default function Home() {
  const [quote, setQuote] = useState<Quote>();
  const [loading, setLoading] = useState<boolean>(true);
  const [color, setColor] = useState<string>(COLORS[3]);
  const [localColor, setLocalColor] = useLocalStorage(LOCAL_KEY.COLOR, color);
  const [count, { startCountdown, resetCountdown }] = useCountdown({
    countStart: 10,
  });
  const [quotesHistory, setQuotesHistory] = useSessionStorage(
    SESSION_KEY.QUOTES,
    ""
  );
  const [indexQuotesHistory, setIndexQuotesHistory] = useState<number>(
    quotesHistory ? JSON.parse(quotesHistory).length - 1 : 0
  );

  const onChangeColor = (_color: string) => {
    setColor(_color);
    setLocalColor(_color);
  };

  const getRandomQuote = () => {
    setLoading(true);
    fetch("https://api.quotable.io/random")
      .then((res) => res.json())
      .then((_quote: Quote) => {
        setQuote(_quote);
        let _quotesHistory: Quote[];
        if (quotesHistory) {
          _quotesHistory = [...JSON.parse(quotesHistory), _quote];
        } else {
          _quotesHistory = [_quote];
        }
        setQuotesHistory(JSON.stringify(_quotesHistory));
        setIndexQuotesHistory(_quotesHistory.length - 1);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        if (quotesHistory && indexQuotesHistory > 0) {
          const _quotesHistory: Quote[] = JSON.parse(quotesHistory);
          const _indexQuotesHistory = indexQuotesHistory - 1;
          setQuote(_quotesHistory[_indexQuotesHistory]);
          setIndexQuotesHistory(_indexQuotesHistory);
        }
      }
      if (event.key === "ArrowRight") {
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
      }
    },
    [quotesHistory, indexQuotesHistory, getRandomQuote]
  );

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
  }, []);

  useEffect(() => {
    getRandomQuote();
    // TODO bo cmt
    // startCountdown();
  }, []);

  useEffect(() => {
    if (count === 0) {
      getRandomQuote();
      resetCountdown();
      startCountdown();
    }
  }, [count]);

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
