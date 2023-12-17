import "./App.css";
import SignInPopup from "../SignInPopup/SignInPopup.js";
import SignUpPopup from "../SignUpPopup/SignUpPopup.js";
import PopupWithMenu from "../PopupWithMenu/PopupWithMenu.jsx";
import { getItems } from "../../utils/Api.js";
import { Route, Switch } from "react-router-dom";
import { useState, useEffect } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";
import { SavedCardsContext } from "../../contexts/SavedCardsContext.js";
import Home from "../../pages/Home";
import SavedNewsPage from "../../pages/SavedNewsPage.jsx";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [searchValue, setSearchValue] = useState(() => {
    if (localStorage.getItem("search")) {
      return localStorage.getItem("search");
    }
    return "";
  });

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
    newCards = savedCardsState.filter(
      (item) => item?.props?.title !== props.title
    );
    setSavedCardsState(newCards);
  };

  const addToSavedCards = (props) => {
    let searchValuetoUpper =
      searchValue.charAt(0).toUpperCase() + searchValue.slice(1);
    setSavedCardsState((prevState) => [
      ...prevState,
      { props, keyword: searchValuetoUpper },
    ]);
  };

  const checkSaveStatus = (props) => {
    const check = savedCardsState?.some(
      (item) => props?.title === item?.props?.title
    );
    check ? deleteFromSavedCards(props) : addToSavedCards(props);
  };

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
    localStorage.setItem("search", value);
  };
  console.log(savedCardsState);
  useEffect(() => {
    loading ? (
      getItems(searchValue)
        .then((res) => {
          setData(res);
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
    <main className="app">
      <CurrentUserContext.Provider value={{ currentUser }}>
        <SavedCardsContext.Provider value={{ savedCardsState }}>
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <Home
                  onSignInModal={onSignInModal}
                  onSignUpModal={onSignUpModal}
                  onCloseModal={onCloseModal}
                  onSearch={onSearch}
                  onSignOut={onSignOut}
                  onMenuModal={onMenuModal}
                  cards={localStorageCards}
                  error={dataError}
                  checkSaveStatus={checkSaveStatus}
                  showNewsCard={showNewsCard}
                  loading={loading}
                />
              )}
            />

            <Route
              path="/savednews"
              render={() => (
                <SavedNewsPage
                  onSignInModal={onSignInModal}
                  onSignUpModal={onSignUpModal}
                  onCloseModal={onCloseModal}
                  onMenuModal={onMenuModal}
                  showNewsCard={showNewsCard}
                  cards={savedCardsState}
                  error={dataError}
                  checkSaveStatus={checkSaveStatus}
                  loading={loading}
                />
              )}
            />
          </Switch>
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
    </main>
  );
}

export default App;
