import "./App.css";
import SignInPopup from "../SignInPopup/SignInPopup.js";
import SignUpPopup from "../SignUpPopup/SignUpPopup.js";
import PopupWithMenu from "../PopupWithMenu/PopupWithMenu.jsx";
import ModalConfirmation from "../ModalConfirmation/ModalConfirmation.jsx";
import {
  getCurrentUser,
  getCardsRequest,
  saveArticle,
  deleteArticle,
} from "../../utils/MainApi.js";
import { getItems } from "../../utils/Api.js";
import { Route, Switch } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";
import { SavedCardsContext } from "../../contexts/SavedCardsContext.js";
import Home from "../../pages/Home";
import SavedNewsPage from "../../pages/SavedNewsPage.jsx";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.js";

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

  const onSignOut = () => {
    localStorage.removeItem("jwt");
    setCurrentUser({});
    onCloseModal();
  };

  const updatedSavedCards = () => {
    const newToken = localStorage.getItem("jwt");
    getCardsRequest(newToken)
      .then((res) => {
        setSavedCardsState(res);
      })
      .catch((err) => console.log(err));
  };

  const getUserAndCards = useCallback((token) => {
    getCurrentUser(token)
      .then((res) => {
        setCurrentUser(res.user);
        localStorage.setItem("jwt", res.token);
      })
      .then(() => {
        // make a whole function to updated context
        updatedSavedCards();
      })
      .catch((err) => console.log(err));
  }, []);
  // used to check if there's current user if so get cards as well
  // useEffect to bring all cards and logged user to keep it in context for any time logged in or refreshed
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    token?.length ? getUserAndCards(token) : <></>;
  }, [getUserAndCards]);

  ////// to control cards status

  // Take out from savedCards
  const deleteFromSavedCards = (id) => {
    const token = localStorage.getItem("jwt");
    deleteArticle(token, id)
      .then((res) => {
        updatedSavedCards();
      })
      .catch((err) => console.log(err));
  };

  // add it to Saved cards list

  const addToSavedCards = (props) => {
    let searchValuetoUpper =
      searchValue.charAt(0).toUpperCase() + searchValue.slice(1);
    const cardInfo = {
      keyword: searchValuetoUpper,
      text: props?.description,
      title: props?.title,
      date: props?.publishedAt,
      source: props?.source?.name,
      link: props?.url,
      image: props.urlToImage,
    };
    const token = localStorage.getItem("jwt");
    saveArticle(token, cardInfo)
      .then((res) => updatedSavedCards())
      .catch((err) => console.log(err));
  };

  const [localStorageCards, setLocalStorageCards] = useState(() => {
    if (localStorage.getItem("data")) {
      return JSON.parse(localStorage.getItem("data"));
    }
    return [];
  });

  const [showNewsCard, setShowNewsCard] = useState(
    () => localStorageCards?.length
  );

  const [dataError, setDataError] = useState("");

  const onSearch = (value) => {
    setShowNewsCard(true);
    setLoading(true);
    setSearchValue(value);
    localStorage.setItem("search", value);
  };

  // to get cards from newsApi
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

  const onRegisteredSuccess = () => {
    setActiveModal("confirmModal");
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
      <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
        <SavedCardsContext.Provider
          value={{ savedCardsState, setSavedCardsState }}
        >
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
                  save={addToSavedCards}
                  unSave={deleteFromSavedCards}
                  showNewsCard={showNewsCard}
                  loading={loading}
                />
              )}
            />
            <ProtectedRoute
              path="/savednews"
              component={SavedNewsPage}
              onSignInModal={onSignInModal}
            >
              <Route
                path="/savednews"
                render={() => (
                  <SavedNewsPage
                    onSignInModal={onSignInModal}
                    onSignUpModal={onSignUpModal}
                    onCloseModal={onCloseModal}
                    onSignOut={onSignOut}
                    onMenuModal={onMenuModal}
                    cards={savedCardsState}
                    unSave={deleteFromSavedCards}
                    error={dataError}
                    loading={loading}
                  />
                )}
              />
            </ProtectedRoute>
          </Switch>
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
              onRegisteredSuccess={onRegisteredSuccess}
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

          {activeModal === "confirmModal" && (
            <ModalConfirmation
              onCloseModal={onCloseModal}
              onSignInModal={onSignInModal}
            ></ModalConfirmation>
          )}
        </SavedCardsContext.Provider>
      </CurrentUserContext.Provider>
    </main>
  );
}

export default App;
