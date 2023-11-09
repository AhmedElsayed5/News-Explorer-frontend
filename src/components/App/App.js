import Header from "../Header/Header.js";
import Main from "../Main/Main.js";
import About from "../About/About.js";
import Footer from "../Footer/Footer.js";
import SavedNews from "../SavedNews/SavedNews.js";
import { Switch, Route } from "react-router-dom/cjs/react-router-dom.min.js";

function App() {
  console.log("App");
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/">
          <Main />
          <About />
        </Route>
        <Route exact path="/saved-news">
          <SavedNews />
        </Route>
      </Switch>

      <Footer />
    </div>
  );
}

export default App;
