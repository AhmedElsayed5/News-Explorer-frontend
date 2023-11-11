import Header from "../Header/Header.js";
import Main from "../Main/Main.js";
import About from "../About/About.js";
import Footer from "../Footer/Footer.js";
import SavedNews from "../SavedNews/SavedNews.js";
import SignInPopup from "../SignInPopup/SignInPopup.js";
import SignUpPopup from "../SignUpPopup/SignUpPopup.js";

// import SignInPop
import { Switch, Route } from "react-router-dom/cjs/react-router-dom.min.js";
import { useState } from "react";

import backGround from "../../images/topBackground.svg";

function App() {
  const [activeModal, setActiveModal] = useState("");
  console.log("App");

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
          />
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
          // onSignInModal={onSignInModal}
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
