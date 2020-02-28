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

function useAxios(baseUrl, formatResponse) {
  const INIT_STATE = [];
  const [data, setData] = useState(INIT_STATE);

  const addData = async (resource = "") => {
    const url = baseUrl + resource;
    console.log(baseUrl);
    console.log(resource)
    let response = await axios.get(url);
    response = formatResponse(response); 
    setData(data => [...data, { ...response, id: uuid() }]);
  };

  const removeData = () => {
    setData(INIT_STATE);
  };

  return [data, addData, removeData];
};

export { useFlip, useAxios };
