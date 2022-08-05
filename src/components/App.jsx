import "../style/styles.css";
import React, { useState } from "react";
import buttons from "./Buttons";

var nextDigit = false;
export default function App() {
  var [digit, setDigit] = useState(0);
  const [formula, setFormula] = useState("");

  function handleInitialize() {
    setDigit(0);
    setFormula("");
  }

  function handleOperators(event) {
    const operator = event.target.value;
    if (nextDigit) {
      digit = 0;
      nextDigit = false;
    }
    setDigit(operator);
    if (formula.includes("=")) {
      console.log(digit);
      setFormula(digit + operator);
    } else {
      setFormula(formula + operator);
    }
    nextDigit = !nextDigit;
  }

  function handleNumbers(event) {
    var number = event.target.value;
    if (nextDigit) {
      digit = 0;
      nextDigit = false;
    }
    if (digit === 0) {
      setDigit(number);
      setFormula(formula + number);
    } else {
      setDigit(parseInt(digit, 10) + number);
      setFormula(formula + number);
    }
  }

  function handleEqual(event) {
    const symbol = event.target.value;
    setFormula(formula + symbol + eval(formula));
    setDigit(eval(formula));
  }
  function handleDecimal(event) {
    setFormula(formula + ".");
    setDigit(event.target.value);
    nextDigit = !nextDigit;
  }

  return (
    <div id="display">
      <div className="inputDisplay">
        <input id="formulaDisplay" value={formula} disabled />
        <input id="digitDisplay" value={digit} disabled />
      </div>
      <div class="buttonsGrid">
        {buttons.map((item, index) => (
          <button
            key={index}
            id={item.id}
            value={item.value}
            className={item.class}
            onClick={eval(item.click)}
          >
            {item.value}
          </button>
        ))}
      </div>
    </div>
  );
}
