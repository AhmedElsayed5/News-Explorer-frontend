import Header from "../components/Header/Header";
import SavedNews from "../components/SavedNews/SavedNews";
import NewsCardList from "../components/NewsCardList/NewsCardList";
import PreLoader from "../components/PreLoader/PreLoader";
import Footer from "../components/Footer/Footer";
const SavedNewsPage = ({
  onSignInModal,
  onSignUpModal,
  onCloseModal,
  onSignOut,
  onMenuModal,
  showNewsCard,
  cards,
  error,
  unSave,
  loading,
}) => {
  return (
    <div>
      <Header
        onSignInModal={onSignInModal}
        onSignUpModal={onSignUpModal}
        onCloseModal={onCloseModal}
        onMenuModal={onMenuModal}
        onSignOut={onSignOut}
        currentPage={"Saved News"}
      />
      <section>
        <SavedNews
          onSignInModal={onSignInModal}
          onSignUpModal={onSignUpModal}
          onCloseModal={onCloseModal}
          onMenuModal={onMenuModal}
        />
      </section>
      <section>
        <NewsCardList cards={cards} unSave={unSave} error={error}>
          {loading && <PreLoader></PreLoader>}
        </NewsCardList>
      </section>
      <Footer />
    </div>
  );
};
export default SavedNewsPage;
