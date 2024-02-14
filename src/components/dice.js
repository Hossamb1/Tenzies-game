import React from "react";

export default function Dice(props) {
  return (
    <div
      className={props.isHeld ? "dice held" : "dice"}
      onClick={props.holdDice}
    >
      <h1>{props.value}</h1>
    </div>
  );
}
// setSaveHeld({ value: saveHeld.value, isHeld: !saveHeld.isHeld });
