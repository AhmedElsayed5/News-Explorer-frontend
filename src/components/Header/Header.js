import "./Header.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Header = ({
  onSignInModal,
  onSignUpModal,
  onCloseModal,
  onMenuModal,
  currentPage,
}) => {
  return (
    <header
      className={
        currentPage === "Home" ? "header" : "header header__saved-news"
      }
      style={{ backgroundImage: "../../topBackground.svg" }}
    >
      {/* header */}
      {currentPage === "Home" ? (
        <div>
          <Link className={`header__logo header__home`} to="/">
            <p>NewsExplorer</p>
          </Link>
        </div>
      ) : (
        <div>
          <Link className={`header__logo`} to="/">
            <p>NewsExplorer</p>
          </Link>
        </div>
      )}
      {/* <div className="header__menu-mobile-view"> */}
      <button onClick={onMenuModal} className="header__menu-mobile-view-button">
        {/* <div className="header__menu-mobile-view-button-container"> */}
        {/* <img src={menu} alt="menu"></img> */}
        {/* </div> */}
        <div className="header__menu-mobile-view-button-design"></div>
        <div className="header__menu-mobile-view-button-design"></div>
      </button>
      {/* </div> */}
      <div className="header__buttons">
        {currentPage === "Home" ? (
          <div className="header__button-container">
            <button
              className={`header__button header__button-home header__home`}
            >
              Home
            </button>
            <div className="header__button-home-highliter"></div>
          </div>
        ) : (
          <div className="header__button-container">
            <button className={`header__button header__button-home`}>
              Home
            </button>
            <div className="header__button-home-highliter"></div>
          </div>
        )}

        {currentPage === "Home" ? (
          <div className="header__button-container">
            <button
              className={`header__button header__button-home header__home-saved-news`}
            >
              Saved articles
            </button>
            <div className=""></div>
          </div>
        ) : (
          <div className="header__button-container">
            <button className={`header__button header__button-home`}>
              Saved articles
            </button>
            <div className="header__button-home-highliter header__button-saved-news-highliter"></div>
          </div>
        )}

        {currentPage === "Home" ? (
          <button
            className="header__button header__signin header__home"
            onClick={onSignInModal}
          >
            Sign-in
          </button>
        ) : (
          <button
            className="header__button header__signin"
            onClick={onSignInModal}
          >
            Sign-in
          </button>
        )}
        {/* <button className="header__button">
          <Link to="saved-news" className="header__button header__link">
            Saved articles
          </Link>
        </button> */}
      </div>
    </header>
  );
};

export default Header;
