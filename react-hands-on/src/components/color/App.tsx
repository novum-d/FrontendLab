import React, { useState } from "react";
import colorData from "../../data/color-data.json";
import { FaTrash } from "react-icons/fa";
import StarRating from "./StarRating";
import AddColorForm from "../form/AddColorFrom";
import ColorProvider, { useColors } from "./ColorProvider";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";

export type AddColorFormProps = {
  id: string;
  rating: number;
  title: string;
  color: string;
};

const App = () => {
  // const [colors, setColors] = useState<AddColorFormProps[]>(colorData);
  return (
    <ColorProvider>
      <>
        <AddColorForm />
        <Routes>
          <Route path="/" element={<ColorList />} />
          <Route path=":id" element={<ColorDetails />} />
        </Routes>
      </>
    </ColorProvider>
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
  const navigate = useNavigate();
  const { removeColor, rateColor } = useColors();
  return (
    <section className="color" onClick={() => navigate(`/${id}`)}>
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

const ColorDetails = () => {
  const { id } = useParams();
  const { colors } = useColors();
  const foundColor = colors.find((color) => color.id === id); // (color) => { color.id === id }は返されないので注意。その場合は、ちゃんとreturnをつける
  if (foundColor === undefined) return;
  return (
    <div>
      <div
        style={{
          backgroundColor: foundColor.color,
          height: 100,
          width: 100,
        }}
      ></div>
      <h1>{foundColor.title}</h1>
      <h1>{foundColor.color}</h1>
    </div>
  );
};

export default App;
