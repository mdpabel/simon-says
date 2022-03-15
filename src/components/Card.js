import React from "react";

const Card = ({ color, opacity, onClick, index }) => {
  return (
    <div
      onClick={onClick}
      className={`w-[234px] h-[234px] ${color} ${opacity} ${
        index === 0
          ? "rounded-tl-full"
          : index === 1
          ? "rounded-tr-full"
          : index === 2
          ? "rounded-bl-full"
          : "rounded-br-full"
      } m-2 shadow-2xl`}
    ></div>
  );
};

export default Card;
