import "./ModalConfirmation.css";
import closeButton from "../../images/CloseButton.svg";

const ModalConfirmation = ({ onCloseModal, onSignInModal }) => {
  return (
    <div className="modal-confirmation">
      <div className="modal-confirmation__content">
        <img
          onClick={onCloseModal}
          className="modal-confirmation_close-button-logo"
          src={closeButton}
          alt={"Close Icon"}
        />
        <p className="modal-confirmation__content-paragraph">
          Registration successfully completed!
        </p>
        <button
          onClick={onSignInModal}
          className="modal-confirmation__content-button"
        >
          signin
        </button>
      </div>
    </div>
  );
};

export default ModalConfirmation;
