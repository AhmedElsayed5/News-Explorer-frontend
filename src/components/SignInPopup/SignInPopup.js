import React, { useState } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

const SignInPopup = ({ onCloseModal, onSignUpModal, isOpen }) => {
  const [email, setEmail] = useState("");
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const [password, setPassWord] = useState("");
  const handlePassWordChange = (e) => {
    setPassWord(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <PopupWithForm
      title="Sign In"
      buttonText="Sign In"
      className="modal__title"
      onCloseModal={onCloseModal}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      onSignUpModal={onSignUpModal}
    >
      <fieldset className="form__field">
        <label className="modal__label">
          Email
          <input
            className="modal__input"
            type="email"
            name="email"
            minLength="1"
            maxLength="60"
            placeholder="Email"
            value={email}
            required={true}
            onChange={handleEmailChange}
          ></input>
        </label>
        <label className="modal__label">
          Password
          <input
            className="modal__input"
            type="password"
            name="password"
            minLength="1"
            maxLength="30"
            placeholder="Password"
            value={password}
            required={true}
            onChange={handlePassWordChange}
          ></input>
        </label>
      </fieldset>
    </PopupWithForm>
  );
};

export default SignInPopup;
