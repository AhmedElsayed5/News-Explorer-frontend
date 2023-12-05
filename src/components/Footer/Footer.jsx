import "./Footer.css";
import githubImage from "../../images/github.svg";
import fbImage from "../../images/facebook.svg";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
const Footer = () => {
  return (
    <footer className="footer">
      <p className="footer__trademark">© 2021 Supersite, Powered by News API</p>
      <div className="footer__icons-links">
        <div className="footer__links">
          <Link to="/" className="footer__link">
            Home
          </Link>
          <a
            href="https://www.practicum.us/"
            className="footer__link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Practicum
          </a>
        </div>
        <div className="footer__icons">
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={githubImage} alt="github link" />
          </a>

          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={fbImage} alt="facebook page" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
