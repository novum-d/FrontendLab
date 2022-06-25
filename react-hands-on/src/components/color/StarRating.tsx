import { FaStar } from "react-icons/fa";
import React from "react";

type StarRatingProps = {
  totalStars: number;
  selectedStars: number;
  onRate: (rating: number) => void;
};

const StarRating = ({
  totalStars = 5,
  selectedStars = 0,
  onRate = () => undefined,
}: StarRatingProps) => {
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
};

type StarProps = {
  selected: boolean;
  onSelect: () => void;
};

const Star = ({ selected = false, onSelect = () => undefined }: StarProps) => (
  <button onClick={onSelect}>
    <FaStar color={selected ? "red" : "grey"} />
  </button>
);

export default StarRating;
