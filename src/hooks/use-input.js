import React, { useState, useReducer } from "react";

const initialInputState = { value: "", isTouched: false };

const inputStateReducer = (preState, action) => {
  if (action.type === "INPUT") {
    return { value: action.value, isTouched: preState.isTouched };
  }
  if (action.type === "BLUR") {
    return { value: preState.value, isTouched: true };
  }
  if (action.type === "RESET") {
    return { value: "", isTouched: false };
  }

  // default state
  return initialInputState;
};

export default function useInput(validateValueFn) {
  // ------------------ METHOD 2-----------------
  // -- use reducer
  // ---------------------------------------------
  const [inputState, dispatchFn] = useReducer(
    inputStateReducer,
    initialInputState
  );

  const valueIsValid = validateValueFn(inputState.value);
  const hasError = !valueIsValid && inputState.isTouched;
  const valueChangeHandler = (event) => {
    dispatchFn({ type: "INPUT", value: event.target.value });
  };
  const inputBlurHandler = (event) => {
    dispatchFn({ type: "BLUR" });
  };
  const reset = () => {
    dispatchFn({ type: "RESET" });
  };

  return {
    value: inputState.value,
    hasError,
    isValid: valueIsValid,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };

  // ------------------ METHOD 1 -----------------
  // -- use state
  // ---------------------------------------------
  //   const [enteredValue, setEnteredValue] = useState("");
  //   const [isTouched, setIsTouched] = useState(false);
  //   const valueIsValid = validateValueFn(enteredValue);
  //   const hasError = !valueIsValid && isTouched;
  //   const valueChangeHandler = (event) => {
  //     setEnteredValue(event.target.value);
  //   };
  //   const inputBlurHandler = (event) => {
  //     setIsTouched(true);
  //   };
  //   const reset = () => {
  //     setEnteredValue("");
  //     setIsTouched(false);
  //   };
  //   return {
  //     value: enteredValue,
  //     hasError,
  //     isValid: valueIsValid,
  //     valueChangeHandler,
  //     inputBlurHandler,
  //     reset,
  //   };
}
