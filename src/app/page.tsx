"use client";
import Colors from "@/components/Colors";
import Content from "@/components/Content";
import Header from "@/components/Header";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

const COLORS = [
  "hsl(345,80%,50%)",
  "hsl(100,80%,50%)",
  "hsl(200,80%,50%)",
  "hsl(227,66%,55%)",
  "hsl(26,80%,50%)",
  "hsl(44,90%,51%)",
  "hsl(280,100%,65%)",
  "hsl(480,100%,25%)",
  "hsl(180,100%,25%)",
];

export default function Home() {
  const [color, setColor] = useState<string>(COLORS[3]);
  const [loading, setLoading] = useState<boolean>(true);
  const [content, setContent] = useState<string>("");
  const [author, setAuthor] = useState<string>("");

  const onChangeColor = (_color: string) => {
    setColor(_color);
    localStorage.setItem("color", _color);
  };

  useEffect(() => {
    const _color = localStorage.getItem("color");
    if (_color) {
      setColor(_color);
    } else {
      setColor(COLORS[3]);
    }
  }, []);

  const getRandomQuote = () => {
    setLoading(true);
    fetch("https://api.quotable.io/random")
      .then((res) => res.json())
      .then((result) => {
        setContent(result.content);
        setAuthor(`_ ${result.author}`);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getRandomQuote();
  }, []);

  return (
    <main
      className="flex min-h-screen flex-col items-center justify-between relative"
      style={{ backgroundColor: color }}
    >
      <Header />
      <Content
        color={color}
        loading={loading}
        content={content}
        author={author}
        getRandomQuote={getRandomQuote}
      />
      <Colors colors={COLORS} onChangeColor={onChangeColor} />
      <ToastContainer />
    </main>
  );
}
