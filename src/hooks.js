import { useState } from "react";
import uuid from "uuid";
import axios from "axios";

function useFlip(initialVal = true) {
  const [isFacingUp, setIsFacingUp] = useState(initialVal);
  const flipCard = () => {
    setIsFacingUp(isUp => !isUp);
  };
  return [isFacingUp, flipCard];
};

function useAxios(baseUrl) {
  const INIT_STATE = [];
  const [cards, setCards] = useState(INIT_STATE);

  const addCard = async (resource = "") => {
    const url = baseUrl + resource;
    const response = await axios.get(url);
    setCards(cards => [...cards, { ...response.data, id: uuid() }]);
  };

  const removeCards = () => {
    setCards(INIT_STATE);
  };

  return [cards, addCard, removeCards];
};

export { useFlip, useAxios };
