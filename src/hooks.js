import { useState } from "react";

function useFlip(initialVal = true) {
  const [isFacingUp, setIsFacingUp] = useState(initialVal);
  const flipCard = () => {
    setIsFacingUp(isUp => !isUp);
  };
  return [isFacingUp, flipCard];
};


export { useFlip };
