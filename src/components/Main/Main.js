import "./Main.css";
const Main = () => {
  return (
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
        <input className="main__search-input"></input>
        <button className="main__search-button">Search</button>
      </div>
    </div>
  );
};

export default Main;
