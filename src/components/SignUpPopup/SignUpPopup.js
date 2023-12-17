import React from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import { useFormWithValidation } from "../UseFormWithValidation/UseFormWithValidation";

const SignUpPopup = ({ onCloseModal, onSignInModal, isOpen }) => {
  const formValidator = useFormWithValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formValidator.values);
  };

  return (
    <PopupWithForm
      title="Sign Up"
      buttonText="Next"
      className="modal__title"
      onCloseModal={onCloseModal}
      isOpen={isOpen}
      isValid={formValidator.isValid}
      onSubmit={handleSubmit}
      onSignInModal={onSignInModal}
    >
      <fieldset className="modal__form-field">
        <label className="modal__label">
          Email
          <input
            className="modal__input"
            type="email"
            name="email"
            minLength="1"
            maxLength="60"
            placeholder="Enter email"
            value={formValidator.values["email"]}
            required={true}
            onChange={(e) => formValidator.handleChange(e)}
          ></input>
          <span className="modal__span">
            {!!formValidator.errors["email"] ? "Invalid email address" : ""}
          </span>
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
            value={formValidator.values["password"]}
            required={true}
            onChange={(e) => formValidator.handleChange(e)}
          ></input>
          <span className="modal__span">
            {!!formValidator.errors["password"] ? "Invalid password" : ""}
          </span>
        </label>
        <label className="modal__label">
          Username
          <input
            className="modal__input"
            type="text"
            name="name"
            minLength="1"
            maxLength="30"
            required={true}
            placeholder="Enter your username"
            value={formValidator.values["name"]}
            onChange={(e) => formValidator.handleChange(e)}
          ></input>
          <span className="modal__span">
            {!!formValidator.errors["name"] ? "Invalid username" : ""}
          </span>
        </label>
      </fieldset>
    </PopupWithForm>
  );
};

export default SignUpPopup;
