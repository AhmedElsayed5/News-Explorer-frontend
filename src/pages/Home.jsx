import Header from "../components/Header/Header";
import Main from "../components/Main/Main";
import NewsCardList from "../components/NewsCardList/NewsCardList";
import PreLoader from "../components/PreLoader/PreLoader";
import About from "../components/About/About";
import Footer from "../components/Footer/Footer";
const Home = ({
  onSignInModal,
  onSignUpModal,
  onCloseModal,
  onSearch,
  onSignOut,
  onMenuModal,
  showNewsCard,
  cards,
  error,
  checkSaveStatus,
  loading,
}) => {
  return (
    <div>
      <div className="header-main">
        <Header
          onSignInModal={onSignInModal}
          onSignUpModal={onSignUpModal}
          onCloseModal={onCloseModal}
          onMenuModal={onMenuModal}
          onSignOut={onSignOut}
          currentPage={"Home"}
        />
        <section>
          <Main
            onSignInModal={onSignInModal}
            onSignUpModal={onSignUpModal}
            onCloseModal={onCloseModal}
            onSearch={onSearch}
            onSignOut={onSignOut}
            onMenuModal={onMenuModal}
          />
        </section>
      </div>
      <section>
        {showNewsCard ? (
          <NewsCardList
            cards={cards}
            error={error}
            checkSaveStatus={checkSaveStatus}
          >
            {loading && <PreLoader></PreLoader>}
          </NewsCardList>
        ) : (
          <></>
        )}
      </section>
      <section>
        <About />
      </section>

      <Footer />
    </div>
  );
};

export default Home;
