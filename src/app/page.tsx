"use client";
import Colors from "@/components/Colors";
import Content from "@/components/Content";
import Header from "@/components/Header";
import { COLORS, LOCAL_KEY } from "@/constants";
import { Quote } from "@/types/quote";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { useCountdown, useLocalStorage } from "usehooks-ts";

export default function Home() {
  const [quote, setQuote] = useState<Quote>();
  const [loading, setLoading] = useState<boolean>(true);
  const [color, setColor] = useState<string>(COLORS[3]);
  const [localColor, setLocalColor] = useLocalStorage(LOCAL_KEY.COLOR, color);
  const [count, { startCountdown, resetCountdown }] = useCountdown({
    countStart: 10,
  });

  const onChangeColor = (_color: string) => {
    setColor(_color);
    setLocalColor(_color);
  };

  useEffect(() => {
    if (localColor) {
      setColor(localColor);
    }
  }, []);

  const getRandomQuote = () => {
    setLoading(true);
    fetch("https://api.quotable.io/random")
      .then((res) => res.json())
      .then((_quote: Quote) => {
        setQuote(_quote);
      })
      .finally(() => {
        setLoading(false);
      });
  };

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
