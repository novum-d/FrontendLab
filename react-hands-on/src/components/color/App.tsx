import React, { useState } from "react";
import colorData from "../../data/color-data.json";
import { FaTrash } from "react-icons/fa";
import StarRating from "./StarRating";
import AddColorForm from "../form/AddColorFrom";
import { useColors } from "./ColorProvider";

export type AddColorFormProps = {
  id: string;
  rating: number;
  title: string;
  color: string;
};

const App = () => {
  // const [colors, setColors] = useState<AddColorFormProps[]>(colorData);
  return (
    <>
      <AddColorForm />
      <ColorList />
    </>
  );
};

const ColorList = () => {
  const { colors } = useColors();

  if (!colors.length) return <div>No Colors Listed. (Add a Color)</div>;
  return (
    <div className="color-list">
      {colors.map((color) => (
        <Color key={color.id} {...color} />
      ))}
    </div>
  );
};

const Color = ({ id, title, color, rating }: AddColorFormProps) => {
  const { removeColor, rateColor } = useColors();
  return (
    <section>
      <h1>{title}</h1>
      <button onClick={() => removeColor(id)}>
        <FaTrash />
      </button>
      <div style={{ height: 50, backgroundColor: color }} />
      <StarRating
        totalStars={5}
        selectedStars={rating}
        onRate={(rating) => rateColor(id, rating)}
      />
    </section>
  );
};

export default App;
