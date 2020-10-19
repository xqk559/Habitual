import React, { useState } from "react";

export default () => {
  const [stringToBeReversed, setStringToBeReversed] = useState("");
  const inputHandler = (event) => {
    if (event.target.value.length >= 5) {
      setStringToBeReversed(event.target.value.split("").reverse().join(""));
    }
  };
  return (
    <div>
      <input onChange={inputHandler} />
      <div>{stringToBeReversed}</div>
    </div>
  );
};
