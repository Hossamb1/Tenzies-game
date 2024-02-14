import React, { useEffect, useState } from "react";
import Dice from "./dice";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
export default function Main() {
  const [randomState, setRandomState] = useState(allNewDice);
  const [tenzies, setTenzies] = useState(false);
  useEffect(() => {
    const firstValue = randomState[2].value;
    const allIsHeld = randomState.every((oldies) => oldies.isHeld);
    const allSameValue = randomState.every(
      (oldies) => oldies.value === firstValue
    );
    randomState.every((oldies) =>
      allIsHeld && allSameValue ? setTenzies(true) : setTenzies(false)
    );
  }, [randomState]);

  function allNewDice() {
    const ArrayOfObjects = [];
    for (let i = 0; i < 10; i++) {
      ArrayOfObjects.push(generateNewDice());
    }
    return ArrayOfObjects;
  }
  function generateNewDice() {
    return {
      value: Math.floor(Math.random() * 7),
      isHeld: false,
      id: nanoid(),
    };
  }

  function holdDice(diceID) {
    return setRandomState((oldDice) =>
      oldDice.map((dice) =>
        diceID === dice.id ? { ...dice, isHeld: !dice.isHeld } : dice
      )
    );
  }
  function rollDice() {
    if (tenzies === false) {
      setRandomState((oldDice) =>
        oldDice.map((dice) => (dice.isHeld ? dice : generateNewDice()))
      );
    } else {
      setRandomState(allNewDice);
    }
  }
  const DiceElement = randomState.map((dice) => (
    <Dice
      value={dice.value}
      key={dice.id}
      isHeld={dice.isHeld}
      holdDice={() => holdDice(dice.id)}
    />
  ));
  return (
    <div className="main">
      {tenzies && <Confetti />}
      <div className="text">
        <h1 onClick={allNewDice}>tenzies</h1>
        <p>
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
      </div>
      <div className="dices">{DiceElement}</div>
      <div className="button">
        <button onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
      </div>
    </div>
  );
}
