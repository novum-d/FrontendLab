import React from "react";
import {FaStar} from "react-icons/fa";

export default function StarRating({totalStars = 5}) {
    return [...Array(totalStars)].map((_, i) => <Star key={i}/>);
}

const Star = ({selected = false}) => (
    <FaStar color={selected ? "red" : "grey"}/>
)
