import "./PopupWithMenu.css";
import closeButton from "../../images/CloseButton.svg";
const PopupWithMenu = ({ onCloseModal, onSignInModal }) => {
  console.log("Menu Modal");
  return (
    <div className="Menu__Modal">
      <div className="Menu__Modal-header-content">
        <div className="Menu__Modal-header">
          <h1 className="Menu__Modal-header-title">News Explorer</h1>
          <button
            type="button"
            onClick={onCloseModal}
            className="modal__close-button-menu-modal"
          >
            <img
              src={closeButton}
              className="modal__close-button-menu-modal-image"
              alt={"Close Icon"}
            ></img>
          </button>
        </div>
        <div className="Menu__Modal-content">
          <button className="Menu__Modal-button Menu__Modal-button-home">
            Home
          </button>
          <button
            onClick={onSignInModal}
            className="Menu__Modal-button Menu__Modal-button-signin"
          >
            Sign in
          </button>
        </div>
      </div>
      <div className="Menu__Modal-remaining"></div>
    </div>
  );
};

export default PopupWithMenu;
