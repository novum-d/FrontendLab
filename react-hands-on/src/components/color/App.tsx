import React, { SetStateAction, useState } from "react";
import colorData from "../../data/color-data.json";
import { FaTrash } from "react-icons/fa";
import StarRating from "./StarRating";
import AddColorForm from "../form/AddColorFrom";
import { v4 } from "uuid";

type AddColorFormProps = {
  id: string;
  rating: number;
  title: string;
  color: string;
};

type ColorListProps = {
  colors: AddColorFormProps[];
} & ColorEventProps;

type ColorEventProps = {
  onRateColor: (id: string, rating: number) => void;
  onRemoveColor: (id: string) => void;
};

type ColorProps = AddColorFormProps & ColorEventProps;

const App = () => {
  const [colors, setColors] = useState<AddColorFormProps[]>(colorData);
  return (
    <>
      <AddColorForm
        onNewColor={(title: string, color: string) => {
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
        }}
      />
      <ColorList
        colors={colors}
        onRateColor={(id: string, rating: number) => {
          const newColors = colors.map((color) =>
            color.id === id ? { ...color, rating } : color
          );
          setColors(newColors);
        }}
        onRemoveColor={(id) => {
          const newColors = colors.filter((color) => color.id !== id);
          setColors(newColors);
        }}
      />
    </>
  );
};

const ColorList = ({
  colors = [],
  onRateColor = () => undefined,
  onRemoveColor = () => undefined,
}: ColorListProps) => {
  if (!colors.length) return <div>No Colors Listed. (Add a Color)</div>;
  return (
    <div className="color-list">
      {colors.map((color) => (
        <Color
          key={color.id}
          {...color}
          onRemoveColor={onRemoveColor}
          onRateColor={onRateColor}
        />
      ))}
    </div>
  );
};

const Color = ({
  id,
  title,
  color,
  rating,
  onRemoveColor = () => undefined,
  onRateColor = () => undefined,
}: ColorProps) => {
  return (
    <section>
      <h1>{title}</h1>
      <button onClick={() => onRemoveColor(id)}>
        <FaTrash />
      </button>
      <div style={{ height: 50, backgroundColor: color }} />
      <StarRating
        totalStars={5}
        selectedStars={rating}
        onRate={(rating) => onRateColor(id, rating)}
      />
    </section>
  );
};

export default App;
