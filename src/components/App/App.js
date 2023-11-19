import Main from "../Main/Main.js";
import About from "../About/About.js";
import Footer from "../Footer/Footer.js";
import SavedNews from "../SavedNews/SavedNews.js";
import SignInPopup from "../SignInPopup/SignInPopup.js";
import SignUpPopup from "../SignUpPopup/SignUpPopup.js";
import { getItems } from "../../utils/Api.js";
import { Switch, Route } from "react-router-dom/cjs/react-router-dom.min.js";
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
  const [localStorageCards, setLocalStorageCards] = useState(() =>
    JSON.parse(localStorage.getItem("data") || [])
  );
  const [showNewsCard, setShowNewsCard] = useState(
    () => localStorageCards.length
  );

  // console.log();
  // const ifWeSearchedBefore = JSON.parse(localStorage.getItem("data") || []);
  // console.log(localStorageCards.length);

  const onSearch = (value) => {
    // setSearchButton(true);
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
          // setLocalStorageCards(JSON.stringify([]));
          console.log(res[0]);
        })
        .catch((err) => console.error(err))
    ) : (
      <></>
    );
  }, [loading, searchValue]);

  useEffect(() => {
    setLoading(false);
    // data.size ? console.log("data to show") : console.log("nothing");
  }, [data]);

  const onSignInModal = () => {
    setActiveModal("signInModal");
  };

  // console.log(data[1]);

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
          {/* {data[1]} */}
          {/* <NewsCard
            source_name={"treehugger"}
            description={`Ever since I read Richard Louv's influential book, "Last Child in the
          Woods," the idea of having a special "sit spot" has stuck with me. This
          advice, which Louv attributes to nature educator Jon Young, is for both
          adults and children to find...`}
            urlToImage={cat}
            publishedAt={"November 4, 2020"}
            title={"Everyone Needs a Special 'Sit Spot' in Nature"}
          /> */}
          {showNewsCard ? (
            <NewsCardList cards={localStorageCards}>
              {loading && <PreLoader></PreLoader>}
            </NewsCardList>
          ) : (
            <></>
          )}

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
