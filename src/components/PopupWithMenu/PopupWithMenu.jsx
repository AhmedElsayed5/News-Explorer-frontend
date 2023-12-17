import "./PopupWithMenu.css";
import React, { useContext } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import closeButton from "../../images/CloseButton.svg";
import logout from "../../images/logout.svg";

const PopupWithMenu = ({ onCloseModal, onSignInModal, onSignOut }) => {
  const { currentUser } = useContext(CurrentUserContext);
  return (
    <div className={`menu`}>
      <div className="menu__header-content">
        <div className="menu__header">
          <h1 className="menu__header-title">
            <Link to="/" className="menu__home-link">
              News Explorer
            </Link>
          </h1>
          <img
            src={closeButton}
            className="menu__close-button-menu-modal-image"
            alt={"Close Icon"}
            onClick={onCloseModal}
          />
        </div>
        <div className="menu__content">
          <button className="menu__button menu__button-home">
            <Link to="/" className="menu__home-link">
              Home
            </Link>
          </button>

          {!currentUser.email && (
            <button
              onClick={onSignInModal}
              className="menu__button menu__button-signin"
            >
              Sign in
            </button>
          )}

          {currentUser.email && (
            <div className="menu__saved-news ">
              <Link className="menu__saved-news-link" to="/savednews">
                Saved articles
              </Link>
            </div>
          )}

          {currentUser.email && (
            <button
              onClick={onSignOut}
              className="menu__button menu__button-signin"
            >
              <div className="header__button-logout">
                {currentUser.email.slice(0, 3).toUpperCase()}
                <img src={logout} alt="logout" />
              </div>
            </button>
          )}
        </div>
      </div>
      <div className="menu__remaining"></div>
    </div>
  );
};

export default PopupWithMenu;
