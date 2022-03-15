import { useCallback, useEffect, useState } from "react";
import Card from "./components/Card";
import getRandomNumber from "./utils/getRandomNumber";
import delay from "./utils/delay";

const colors = ["bg-green-900", "bg-red-900", "bg-blue-900", "bg-yellow-900"];

function App() {
  const [isPressed, setIsPressed] = useState(false);
  const [score, setScore] = useState(0);
  const [highLightedCards, setHighLightedCards] = useState([]);
  const [userColors, setUserColors] = useState([]);
  const [userMode, setUserMode] = useState(false);
  const [flash, setFlash] = useState(null);

  const randomColor = () => {
    const getRandomCard = getRandomNumber();
    setHighLightedCards([...highLightedCards, getRandomCard]);
  };

  const handleFlash = useCallback(async () => {
    for (let i = 0; i < highLightedCards.length; i++) {
      await delay(500);
      setFlash(highLightedCards[i]);
      await delay(500);
      setFlash(null);
    }
    setUserColors(highLightedCards);
    setUserMode(true);
  }, [highLightedCards]);

  const userFlash = async (index) => {
    if (userMode) {
      const copyColors = [...userColors];
      const color = copyColors.shift();
      if (index === color) {
        setFlash(color);
        await delay(500);
        setFlash(null);
        setUserColors(copyColors);
        if (!copyColors.length) {
          setUserMode(false);
          randomColor();
          setScore(highLightedCards.length);
        }
      } else {
        window.alert("Your score is " + score);
        setIsPressed(false);
        setUserMode(false);
        setHighLightedCards([]);
        setUserColors([]);
        setFlash(null);
        setScore(0);
      }
    }
  };

  const handlePressButton = () => {
    if (!userMode) {
      setIsPressed(true);
      randomColor();
      setUserMode(true);
    }
  };

  useEffect(() => {
    if (highLightedCards.length) {
      handleFlash();
    }
  }, [handleFlash, highLightedCards, highLightedCards.length]);

  return (
    <div className="flex justify-center items-center w-full h-screen bg-gradient-to-r from-indigo-50 to-pink-50 ">
      <div
        style={{ width: "500px", height: "500px" }}
        className="flex flex-wrap relative rounded-full"
      >
        {colors.map((color, index) => (
          <Card
            onClick={() => userFlash(index)}
            key={index}
            color={color}
            index={index}
            opacity={flash === index ? "opacity-100" : "opacity-80"}
          />
        ))}

        <button
          onClick={handlePressButton}
          className="bg-slate-700 text-slate-100 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full w-40 h-40 border-4 border-slate-800 text-3xl shadow-2xl "
        >
          {isPressed ? score : "Press"}
        </button>
      </div>
    </div>
  );
}

export default App;
