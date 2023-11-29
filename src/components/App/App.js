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
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";
import { SavedCardsContext } from "../../contexts/SavedCardsContext.js";
import PreLoader from "../PreLoader/PreLoader.js";
import NewsCardList from "../NewsCardList/NewsCardList.jsx";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [savedCardsState, setSavedCardsState] = useState([]);

  const onSignIn = ({ email, password }) => {
    setCurrentUser({ email, password });
    onCloseModal();
  };

  const onSignOut = () => {
    setCurrentUser({});
    onCloseModal();
  };

  const deleteFromSavedCards = (props) => {
    let newCards;
    newCards = savedCardsState.filter((item) => item.title !== props.title);
    setSavedCardsState(newCards);
  };

  const addToSavedCards = (props) => {
    setSavedCardsState((prevState) => [...prevState, props]);
  };

  const checkSaveStatus = (props) => {
    const check =
      savedCardsState.length &&
      savedCardsState.some((item) => props.title === item.title);
    check ? deleteFromSavedCards(props) : addToSavedCards(props);
  };

  // to check savedCards content
  useEffect(() => {
    console.log(savedCardsState);
  }, [savedCardsState]);

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
    <>
      <CurrentUserContext.Provider value={{ currentUser }}>
        <SavedCardsContext.Provider value={{ savedCardsState }}>
          <Switch>
            <Route exact path="/">
              {/* <PopupWithMenu onCloseModal={onCloseModal} /> */}
              <Main
                onSignInModal={onSignInModal}
                onSignUpModal={onSignUpModal}
                onCloseModal={onCloseModal}
                onSearch={onSearch}
                onSignOut={onSignOut}
                onMenuModal={onMenuModal}
              />

              {showNewsCard ? (
                <NewsCardList
                  cards={localStorageCards}
                  error={dataError}
                  checkSaveStatus={checkSaveStatus}
                >
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
                onMenuModal={onMenuModal}
              />
              {showNewsCard ? (
                <NewsCardList
                  cards={localStorageCards}
                  error={dataError}
                  checkSaveStatus={checkSaveStatus}
                >
                  {loading && <PreLoader></PreLoader>}
                </NewsCardList>
              ) : (
                <></>
              )}
            </Route>
          </Switch>

          <Footer />
          {activeModal === "signInModal" && (
            <SignInPopup
              onSignUpModal={onSignUpModal}
              onCloseModal={onCloseModal}
              onSignIn={onSignIn}
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
              onSignOut={onSignOut}
            ></PopupWithMenu>
          )}
        </SavedCardsContext.Provider>
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
