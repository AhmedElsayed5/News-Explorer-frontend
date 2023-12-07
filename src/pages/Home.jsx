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
        <Main
          onSignInModal={onSignInModal}
          onSignUpModal={onSignUpModal}
          onCloseModal={onCloseModal}
          onSearch={onSearch}
          onSignOut={onSignOut}
          onMenuModal={onMenuModal}
        />
      </div>
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
      <About />
      <Footer />
    </div>
  );
};

export default Home;
