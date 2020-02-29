import { useState, useEffect } from "react";
import uuid from "uuid";
import axios from "axios";

function useFlip(initialVal = true) {
  const [isFacingUp, setIsFacingUp] = useState(initialVal);
  const flipCard = () => {
    setIsFacingUp(isUp => !isUp);
  };
  return [isFacingUp, flipCard];
};

function useAxios(baseUrl, formatResponse, storageKey) {
  const INIT_STATE = [];
  const [data, setData] = useLocalStorage(storageKey);

  const addData = async (resource = "") => {
    const url = baseUrl + resource;
    let response = await axios.get(url);
    response = formatResponse(response); 
    setData(data => [...data, { ...response, id: uuid() }]);
  };

  const removeData = () => {
    setData(INIT_STATE);
    localStorage.removeItem(storageKey);
  };

  return [data, addData, removeData];
};

function useLocalStorage(key) {
  let initialValue = JSON.parse(localStorage.getItem(key)) || [];
  const [value, setValue] = useState(initialValue)

  // const updateStorageAndState = (setValueCallback) => {
  //   setValue(setValueCallback);
  //   // localStorage.setItem(key, JSON.stringify(value));
  // }

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

export { useFlip, useAxios, useLocalStorage };
