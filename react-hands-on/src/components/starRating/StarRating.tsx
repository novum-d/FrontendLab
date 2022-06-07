import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

export const StarRating = ({ style = {}, totalStars = 5, ...props }) => {
  const [selectedStars, setSelectedStars] = useState(0);
  return (
    <div style={{ padding: "5px", ...style }} {...props}>
      {[...Array(totalStars)].map((n, i) => (
        <Star
          key={i}
          selected={selectedStars > i}
          onSelect={() => setSelectedStars(i + 1)}
        />
      ))}
      <p>
        {selectedStars} of {totalStars} stars
      </p>
    </div>
  );
};

type StarProps = {
  selected: boolean;
  onSelect: () => void;
};

const Star = ({ selected = false, onSelect = () => undefined }: StarProps) => (
  <FaStar color={selected ? "red" : "grey"} onClick={onSelect} />
);
