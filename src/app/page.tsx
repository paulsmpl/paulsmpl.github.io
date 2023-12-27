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

  const onChangeColor = (_color: string) => {
    setColor(_color);
    localStorage.setItem("color", _color);
  };

  useEffect(() => {
    const _color = localStorage.getItem("color");
    if (_color) {
      setColor(_color);
    }
  }, []);

  return (
    <main
      className="flex min-h-screen flex-col items-center justify-between relative bg-[${color}]"
      style={{ backgroundColor: color }}
    >
      <Header />
      <Content color={color} />
      <Colors colors={COLORS} onChangeColor={onChangeColor} />{" "}
      <ToastContainer />
    </main>
  );
}
