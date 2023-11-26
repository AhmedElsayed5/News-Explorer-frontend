import Main from "../Main/Main.js";
import About from "../About/About.js";
import Footer from "../Footer/Footer.js";
import SavedNews from "../SavedNews/SavedNews.js";
import SignInPopup from "../SignInPopup/SignInPopup.js";
import SignUpPopup from "../SignUpPopup/SignUpPopup.js";
import PopupWithMenu from "../PopupWithMenu/PopupWithMenu.jsx";
import { getItems } from "../../utils/Api.js";
import { Route, Switch } from "react-router-dom";
import { useState, useEffect } from "react";
import PreLoader from "../PreLoader/PreLoader.js";
import NewsCardList from "../NewsCardList/NewsCardList.jsx";

function App() {
  // state for preloader if runs and no data available
  // save data at local storage
  const [activeModal, setActiveModal] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [localStorageCards, setLocalStorageCards] = useState(() => {
    if (localStorage.getItem("data")) {
      return JSON.parse(localStorage.getItem("data"));
    }
    return [];
  });
  const [showNewsCard, setShowNewsCard] = useState(
    () => localStorageCards.length
  );
  const [dataError, setDataError] = useState("");

  console.log(window.location.href);

  const onSearch = (value) => {
    setShowNewsCard(true);
    setLoading(true);
    setSearchValue(value);
  };

  useEffect(() => {
    loading ? (
      getItems(searchValue)
        .then((res) => {
          setData(res);
          //set on local storage
          localStorage.setItem("data", JSON.stringify(res));
          setLocalStorageCards(JSON.parse(localStorage.getItem("data")));
        })
        .catch((err) => {
          console.error(err);
          setDataError(err);
        })
    ) : (
      <></>
    );
  }, [loading, searchValue]);
  useEffect(() => {
    setLoading(false);
  }, [data]);

  const onSignInModal = () => {
    setActiveModal("signInModal");
  };

  const onSignUpModal = () => {
    setActiveModal("signUpModal");
  };

  const onMenuModal = () => {
    setActiveModal("menuModal");
  };

  const onCloseModal = () => {
    setActiveModal("");
  };
  useEffect(() => {
    if (!activeModal) return;

    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        onCloseModal();
      }
    };

    const handleOutSideClick = (e) => {
      if (e.target.className === "modal") onCloseModal();
    };

    document.addEventListener("click", handleOutSideClick);
    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
      document.removeEventListener("click", handleOutSideClick);
    };
  }, [activeModal]);

  return (
    <div>
      <Switch>
        <Route exact path="/">
          {/* <PopupWithMenu onCloseModal={onCloseModal} /> */}
          <Main
            onSignInModal={onSignInModal}
            onSignUpModal={onSignUpModal}
            onCloseModal={onCloseModal}
            onSearch={onSearch}
            onMenuModal={onMenuModal}
          />

          {showNewsCard ? (
            <NewsCardList cards={localStorageCards} error={dataError}>
              {loading && <PreLoader></PreLoader>}
            </NewsCardList>
          ) : (
            <></>
          )}

          <About />
        </Route>
        <Route exact path="/savednews">
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
      {activeModal === "menuModal" && (
        <PopupWithMenu
          onMenuModal={onMenuModal}
          onCloseModal={onCloseModal}
          onSignInModal={onSignInModal}
        ></PopupWithMenu>
      )}
    </div>
  );
}

export default App;
