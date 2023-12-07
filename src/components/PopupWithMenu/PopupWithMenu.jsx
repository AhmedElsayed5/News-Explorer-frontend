import "./PopupWithMenu.css";
import React, { useContext } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import closeButton from "../../images/CloseButton.svg";
import logout from "../../images/logout.svg";

const PopupWithMenu = ({ onCloseModal, onSignInModal, onSignOut }) => {
  const { currentUser } = useContext(CurrentUserContext);
  return (
    <div className={`menu__modal`}>
      <div className="menu__modal-header-content">
        <div className="menu__modal-header">
          <h1 className="menu__modal-header-title">News Explorer</h1>
          <img
            src={closeButton}
            className="modal__close-button-menu-modal-image"
            alt={"Close Icon"}
            onClick={onCloseModal}
          />
        </div>
        <div className="menu__modal-content">
          <button className="menu__modal-button menu__modal-button-home">
            <Link to="/" className="header__home-link">
              Home
            </Link>
          </button>

          {!currentUser.email && (
            <button
              onClick={onSignInModal}
              className="menu__modal-button menu__modal-button-signin"
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
              className="menu__modal-button menu__modal-button-signin"
            >
              <div className="header__button-logout">
                {currentUser.email.slice(0, 3).toUpperCase()}
                <img src={logout} alt="logout" />
              </div>
            </button>
          )}
        </div>
      </div>
      <div className="menu__modal-remaining"></div>
    </div>
  );
};

export default PopupWithMenu;
