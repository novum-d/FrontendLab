import { FaStar } from "react-icons/fa";
import React from "react";

type StarRatingProps = {
  totalStars: number;
  selectedStars: number;
  onRate: (rating: number) => void;
};

const StarRating: React.FC<StarRatingProps> = ({
  totalStars = 5,
  selectedStars = 0,
  onRate = () => undefined,
}) => {
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

const Star: React.FC<StarProps> = ({
  selected = false,
  onSelect = () => undefined,
}) => <FaStar color={selected ? "red" : "grey"} onClick={onSelect} />;

export default StarRating;
