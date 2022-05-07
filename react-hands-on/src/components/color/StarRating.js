import { FaStar } from "react-icons/fa";
import React from "react";

export default StarRating;

function StarRating({ totalStars = 5, selectedStars = 0, onRate = (f) => f }) {
  return (
    <>
      {[...Array(totalStars)].map((n, i) => (
        <Star
          key={i}
          selected={selectedStars > i}
          onSelect={() => onRate(i + 1)}
        />
      ))}
    </>
  );
}

const Star = ({ selected = false, onSelect = (f) => f }) => (
  <FaStar color={selected ? "red" : "grey"} onClick={onSelect} />
);
