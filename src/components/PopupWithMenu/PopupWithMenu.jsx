import "./PopupWithMenu.css";
import React, { useContext } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import closeButton from "../../images/CloseButton.svg";
import logout from "../../images/logout.svg";

const PopupWithMenu = ({
  onCloseModal,
  onSignInModal,
  onSignOut,
  currentPage,
}) => {
  const { currentUser } = useContext(CurrentUserContext);
  // console.log("Menu Modal");
  return (
    <div className={`Menu__Modal`}>
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
            <Link to="/" className="header__home-link">
              Home
            </Link>
          </button>

          {!currentUser.email && (
            <button
              onClick={onSignInModal}
              className="Menu__Modal-button Menu__Modal-button-signin"
            >
              Sign in
            </button>
          )}

          {currentUser.email && (
            <div className="menu__modal-saved-news ">
              <Link className="menu__modal-saved-news-link" to="/savednews">
                Saved articles
              </Link>
            </div>
          )}

          {currentUser.email && (
            <button
              onClick={onSignOut}
              className="Menu__Modal-button Menu__Modal-button-signin"
            >
              <div className="header__button-logout">
                {currentUser.email.slice(0, 3).toUpperCase()}
                <img src={logout} alt="logout" />
              </div>
            </button>
          )}
        </div>
      </div>
      <div className="Menu__Modal-remaining"></div>
    </div>
  );
};

export default PopupWithMenu;
