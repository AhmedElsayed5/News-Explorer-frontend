import Header from "../Header/Header";
import { useState } from "react";
import "./Main.css";

const Main = ({ onSignInModal, onSignUpModal, onCloseModal, onSearch }) => {
  const [search, setSearch] = useState("");
  const handleSearch = (e) => {
    // console.log(e.target.value);
    setSearch(e.target.value);
  };

  const onSubmitSearh = (e) => {
    e.preventDefault();
    onSearch(search);
  };
  return (
    <div className="header-main">
      <Header
        onSignInModal={onSignInModal}
        onSignUpModal={onSignUpModal}
        onCloseModal={onCloseModal}
        currentPage={"Home"}
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
          <form onSubmit={onSubmitSearh}>
            <input
              className="main__search-input-container"
              placeholder="Enter topic"
              type="text"
              name="search"
              value={search}
              onChange={handleSearch}
              required
            ></input>
            <button className="main__search-button" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Main;
