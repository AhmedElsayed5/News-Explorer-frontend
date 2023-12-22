import React, { useState, useContext } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import { useFormWithValidation } from "../UseFormWithValidation/UseFormWithValidation";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { SavedCardsContext } from "../../contexts/SavedCardsContext";
import { signIn, getCardsRequest } from "../../utils/MainApi";

const SignInPopup = ({ onCloseModal, onSignUpModal, isOpen }) => {
  const formValidator = useFormWithValidation();
  const [error, setError] = useState({});

  const { setCurrentUser } = useContext(CurrentUserContext);
  const { setSavedCardsState } = useContext(SavedCardsContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    signIn({
      email: formValidator.values["email"],
      password: formValidator.values["password"],
    })
      .then((res) => {
        // localStorage.removeItem("jwt");
        localStorage.setItem("jwt", res.token);
        setCurrentUser(res.user);
        return getCardsRequest(res.token);
      })
      .then((res) => {
        setSavedCardsState(res);
        onCloseModal();
      })
      .catch((err) => {
        setError(err);
        console.log(err);
      })
      .finally(() => {});
  };

  return (
    <PopupWithForm
      title="Sign In"
      error={error}
      buttonText="Sign In"
      className="modal__title"
      onCloseModal={onCloseModal}
      isOpen={isOpen}
      isValid={formValidator.isValid}
      onSubmit={handleSubmit}
      onSignUpModal={onSignUpModal}
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
      </fieldset>
    </PopupWithForm>
  );
};

export default SignInPopup;
