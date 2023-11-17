import Main from "../Main/Main.js";
import About from "../About/About.js";
import Footer from "../Footer/Footer.js";
import SavedNews from "../SavedNews/SavedNews.js";
import SignInPopup from "../SignInPopup/SignInPopup.js";
import SignUpPopup from "../SignUpPopup/SignUpPopup.js";
import { getItems } from "../../utils/Api.js";
// import SignInPop
import { Switch, Route } from "react-router-dom/cjs/react-router-dom.min.js";
import { useState, useEffect } from "react";
import PreLoader from "../PreLoader/PreLoader.js";

// import backGround from "../../images/topBackground.svg";

function App() {
  // state for preloader if runs and no data available
  // save data at local storage
  const [activeModal, setActiveModal] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const onSearch = (value) => {
    setLoading(true);
    setSearchValue(value);
  };

  useEffect(() => {
    loading ? (
      getItems(searchValue)
        .then((res) => {
          setData(res);
          console.log(res);
        })
        .catch((err) => console.error(err))
        .finally(setLoading(false), !data.size ? <div>No Data</div> : <></>)
    ) : (
      <></>
    );
  }, [loading, searchValue]);

  const onSignInModal = () => {
    setActiveModal("signInModal");
  };

  const onSignUpModal = () => {
    console.log("sign uppppp");
    setActiveModal("signUpModal");
  };

  const onCloseModal = () => {
    setActiveModal("");
  };

  return (
    <div>
      <Switch>
        <Route exact path="/">
          <Main
            onSignInModal={onSignInModal}
            onSignUpModal={onSignUpModal}
            onCloseModal={onCloseModal}
            onSearch={onSearch}
          />
          {loading && <PreLoader></PreLoader>}
          {data.length ? <div>We have cards to show</div> : <></>}
          <About />
        </Route>
        <Route exact path="/saved-news">
          <SavedNews
            onSignInModal={onSignInModal}
            onSignUpModal={onSignUpModal}
            onCloseModal={onCloseModal}
          />
        </Route>
      </Switch>

      <Footer />
      {activeModal === "signInModal" && (
        <SignInPopup
          onSignUpModal={onSignUpModal}
          onCloseModal={onCloseModal}
        ></SignInPopup>
      )}
      {activeModal === "signUpModal" && (
        <SignUpPopup
          onSignInModal={onSignInModal}
          onCloseModal={onCloseModal}
        ></SignUpPopup>
      )}
    </div>
  );
}

export default App;
