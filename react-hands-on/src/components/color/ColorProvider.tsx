import React, { useState, useContext, createContext } from "react";
import colorData from "../../data/color-data.json";
import { AddColorFormProps } from "../color/App";
import { v4 } from "uuid";

export type ColorCtxProps = {
  colors: AddColorFormProps[];
  addColor: (title: string, color: string) => void;
  rateColor: (id: string, rating: number) => void;
  removeColor: (id: string) => void;
};

// createContextを用いて作成したコンテキストオブジェクトは、
// 「オブジェクト名.Provider」および「オブジェクト名.Consumer」の２つのコンポーネントを提供する

const ColorCtx = createContext<ColorCtxProps>({} as ColorCtxProps);

const ColorProvider = ({ children }: { children: JSX.Element }) => {
  const [colors, setColors] = useState<AddColorFormProps[]>(colorData);

  const addColor = (title: string, color: string) => {
    const newColor = [
      ...colors, // 配列を結合するスプレット構文(tsでスプレット構文を書くには、Down levelingが必要)
      {
        id: v4(),
        rating: 0,
        title,
        color,
      },
    ];
    setColors(newColor);
  };
  const rateColor = (id: string, rating: number) => {
    const newColors = colors.map((color) =>
      color.id === id ? { ...color, rating } : color
    );
    setColors(newColors);
  };
  const removeColor = (id: string) => {
    const newColors = colors.filter((color) => color.id !== id);
    setColors(newColors);
  };

  return (
    <ColorCtx.Provider value={{ colors, addColor, removeColor, rateColor }}>
      {children}
    </ColorCtx.Provider>
  );
};

export default ColorProvider;

export const useColors = () => useContext(ColorCtx);
