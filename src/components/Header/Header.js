import "./Header.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Header = () => {
  return (
    <header
      className="header"
      style={{ backgroundImage: "../../topBackground.svg" }}
    >
      <div>
        <Link className="header__logo" to="/">
          <p>NewsExplorer</p>
        </Link>
      </div>
      <div className="header__buttons">
        <button className="header__button header__button-home">Home</button>
        <button className="header__button header__signin">Sign-in</button>
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
