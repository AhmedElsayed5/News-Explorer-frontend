import "./PopupWithForm.css";

import closeButton from "../../images/CloseButton.svg";
const ModalWithForm = ({
  children,
  onSignUpModal,
  onSignInModal,
  buttonText,
  title,
  onCloseModal,
  name, //
  onSubmit, //
}) => {
  return (
    // <div className={`modal__blury-filter`}>
    <div className={`modal`}>
      <div className="modal__content">
        <button
          type="button"
          onClick={onCloseModal}
          className="modal__close-button"
        >
          <img src={closeButton} alt={"Close Icon"}></img>
        </button>
        <h3 className="modal__title">{title}</h3>
        <form onSubmit={onSubmit} className="modal__labels">
          {children}
          {title === "Sign In" ? (
            <div className="modal__buttons">
              <button className="modal__button-submit" type="submit">
                {buttonText}
              </button>
              <div className="modal__button-other-option-content">
                or
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
                or
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
    // </div>
  );
};

export default ModalWithForm;
