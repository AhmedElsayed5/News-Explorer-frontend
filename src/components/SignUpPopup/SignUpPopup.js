import React, { useState } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

const SignUpPopup = ({ onCloseModal, onSignInModal, isOpen }) => {
  const [name, setName] = useState("");
  const handleNameChange = (e) => {
    console.log(e.target.value);
    setName(e.target.value);
  };

  const [avatar, setUrl] = useState("");
  const handleUrlChange = (e) => {
    console.log(e.target.value);
    setUrl(e.target.value);
  };

  const [email, setEmail] = useState("");
  const handleEmailChange = (e) => {
    console.log(e.target.value);
    setEmail(e.target.value);
  };

  const [password, setPassWord] = useState("");
  const handlePassWordChange = (e) => {
    console.log(e.target.value);
    setPassWord(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // onSignUp({ email, password, name, avatar });
  };

  return (
    <PopupWithForm
      title="Sign Up"
      buttonText="Next"
      className="modal__title"
      onCloseModal={onCloseModal}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      onSignInModal={onSignInModal}
    >
      <fieldset className="form__field">
        <label className="modal__label">
          Email
          <input
            className="modal__input"
            type="text"
            name="email"
            minLength="1"
            maxLength="60"
            placeholder="Enter email"
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
            placeholder="Enter password"
            value={password}
            required={true}
            onChange={handlePassWordChange}
          ></input>
        </label>
        <label className="modal__label">
          Username
          <input
            className="modal__input"
            type="text"
            name="name"
            minLength="1"
            maxLength="30"
            placeholder="Enter your username"
            value={name}
            onChange={handleNameChange}
          ></input>
        </label>
      </fieldset>
    </PopupWithForm>
  );
};

export default SignUpPopup;
