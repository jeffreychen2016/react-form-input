import { useState, useRef } from "react";
import useInput from "../hooks/use-input";
import useIput from "../hooks/use-input";

const SimpleInput = (props) => {
  // ---------- METHOD 3 ------------
  // use custom hook
  // --------------------------------
  const nameValidator = (value) => value.trim() !== "";

  const {
    value: enteredName,
    hasError: nameInputHasError,
    isValid: enteredNameIsValid,
    valueChangeHandler: nameChangedHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput,
  } = useInput(nameValidator);

  let formIsValid = false;
  if (!nameInputHasError) {
    formIsValid = true;
  }

  // handlers
  const formSubmissionHandler = (event) => {
    event.preventDefault();

    if (!enteredNameIsValid) {
      return;
    }

    console.log(enteredName);

    resetNameInput();
  };

  const nameInputClasses = nameInputHasError
    ? "form-control invalid"
    : "form-control";

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          value={enteredName}
          onChange={nameChangedHandler}
          onBlur={nameBlurHandler}
        />
        {nameInputHasError && (
          <p className="error-text">empty name is not allowed!</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );

  // // ---------- METHOD 1 ------------
  // // use state
  // // --------------------------------
  // const [enteredName, setEnteredName] = useState("");
  // const [enterendNameTouched, setEnteredNameTouched] = useState(false);
  // // const [formIsValid, setFormIsValid] = useState(false);

  // // derive state from `entereName` state
  // const enteredNameIsValid = enteredName.trim() !== "";
  // const nameInputIsInvalid = !enteredNameIsValid && enterendNameTouched;

  // let formIsValid = false;
  // if (enteredNameIsValid) {
  //   formIsValid = true;
  // }

  // // useEffect(() => {
  // //   if (enteredNameIsValid) {
  // //     setFormIsValid(true);
  // //   } else {
  // //     setFormIsValid(false);
  // //   }
  // //   // add all input fields are dependencies if there are more: entereAgeIsValid
  // // }, [enteredNameIsValid]);

  // // handlers
  // const nameInputChangeHandler = (event) => {
  //   setEnteredName(event.target.value);
  // };

  // const nameInputBlurHandler = (event) => {
  //   setEnteredNameTouched(true);
  // };

  // const formSubmissionHandler = (event) => {
  //   event.preventDefault();

  //   setEnteredNameTouched(true);

  //   if (!enteredNameIsValid) {
  //     return;
  //   }

  //   console.log(enteredName);
  //   // reset the input
  //   setEnteredName("");
  //   setEnteredNameTouched(false);
  // };

  // const nameInputClasses = enteredNameIsValid
  //   ? "form-control invalid"
  //   : "form-control";

  // return (
  //   <form onSubmit={formSubmissionHandler}>
  //     <div className={nameInputClasses}>
  //       <label htmlFor="name">Your Name</label>
  //       <input
  //         type="text"
  //         id="name"
  //         value={enteredName}
  //         onChange={nameInputChangeHandler}
  //         onBlur={nameInputBlurHandler}
  //       />
  //       {nameInputIsInvalid && (
  //         <p className="error-text">empty name is not allowed!</p>
  //       )}
  //     </div>
  //     <div className="form-actions">
  //       <button disabled={!formIsValid}>Submit</button>
  //     </div>
  //   </form>
  // );

  // ---------- METHOD 2 ------------
  // use ref
  // --------------------------------
  // const nameInputRef = useRef();

  // const formSubmissionHandler = (event) => {
  //   event.preventDefault();
  //   console.log(nameInputRef.current.value);

  //   // however, we can not really clear input with this approach
  //   // this works, but we DO NOT want manipualte the DOM ourselves
  //   // nameInputRef.current.value = "";
  // };

  // return (
  //   <form onSubmit={formSubmissionHandler}>
  //     <div className="form-control">
  //       <label htmlFor="name">Your Name</label>
  //       <input ref={nameInputRef} type="text" id="name" />
  //     </div>
  //     <div className="form-actions">
  //       <button>Submit</button>
  //     </div>
  //   </form>
  // );
};

export default SimpleInput;
