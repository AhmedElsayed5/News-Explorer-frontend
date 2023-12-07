import "./PopupWithForm.css";

import closeButton from "../../images/CloseButton.svg";
const ModalWithForm = ({
  children,
  onSignUpModal,
  onSignInModal,
  buttonText,
  title,
  onCloseModal,
  onSubmit,
}) => {
  return (
    <div className={`modal`}>
      <div className="modal__content">
        <img
          onClick={onCloseModal}
          className="modal__close-button-logo"
          src={closeButton}
          alt={"Close Icon"}
        />
        <h3 className="modal__title">{title}</h3>
        <form onSubmit={onSubmit} className="modal__labels">
          {children}
          {title === "Sign In" ? (
            <div className="modal__buttons">
              <button className="modal__button-submit" type="submit">
                {buttonText}
              </button>
              <div className="modal__button-other-option-content">
                <p className="modal__button-other-option-content-or">or</p>
                <button
                  onClick={onSignUpModal}
                  className="modal__button-other-option"
                >
                  Sign up
                </button>
              </div>
            </div>
          ) : (
            <div className="modal__buttons">
              <button className="modal__button-submit" type="submit">
                {buttonText}
              </button>
              <div className="modal__button-other-option-content modal__button-other-option-signup-only">
                <p className="modal__button-other-option-content-or">or</p>
                <button
                  onClick={onSignInModal}
                  className="modal__button-other-option "
                >
                  Sign In
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ModalWithForm;
