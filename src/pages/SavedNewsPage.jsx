import Header from "../components/Header/Header";
import SavedNews from "../components/SavedNews/SavedNews";
import NewsCardList from "../components/NewsCardList/NewsCardList";
import PreLoader from "../components/PreLoader/PreLoader";
import Footer from "../components/Footer/Footer";
const SavedNewsPage = ({
  onSignInModal,
  onSignUpModal,
  onCloseModal,
  onMenuModal,
  showNewsCard,
  cards,
  error,
  checkSaveStatus,
  loading,
}) => {
  return (
    <div>
      <Header
        onSignInModal={onSignInModal}
        onSignUpModal={onSignUpModal}
        onCloseModal={onCloseModal}
        onMenuModal={onMenuModal}
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
      <Footer />
    </div>
  );
};
export default SavedNewsPage;
