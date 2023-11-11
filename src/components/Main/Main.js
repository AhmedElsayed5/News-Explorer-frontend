import Header from "../Header/Header";
import "./Main.css";
import backGround from "../../images/topBackground.svg";

const Main = ({ onSignInModal, onSignUpModal, onCloseModal }) => {
  return (
    <div className="header-main">
      <Header
        onSignInModal={onSignInModal}
        onSignUpModal={onSignUpModal}
        onCloseModal={onCloseModal}
      />
      <div className="main">
        <div className="main__title-paragraph">
          <h1 className="main__title">
            What's going on in
            <br />
            the world?
          </h1>

          <div className="main__paragraph">
            Find the latest news on any topic and save them in your personal
            account.
          </div>
        </div>
        <div className="main__search-button-input">
          {/* <div className="main__search-input-container">
            <input
              className="main__search-input"
              placeholder="Enter topic"
            ></input>
          </div> */}
          {/* <div className="main__search-input-container"> */}
          <input
            className="main__search-input-container"
            placeholder="Enter topic"
          ></input>
          <button className="main__search-button">Search</button>
        </div>
      </div>
    </div>
  );
};

export default Main;
