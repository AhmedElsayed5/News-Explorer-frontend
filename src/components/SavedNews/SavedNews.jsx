import Header from "../Header/Header";
import SavedNewsInfo from "../SavedNewsInfo/SavedNewsInfo";

const SavedNews = ({
  onSignInModal,
  onSignUpModal,
  onCloseModal,
  onMenuModal,
}) => {
  return (
    <section>
      <Header
        onSignInModal={onSignInModal}
        onSignUpModal={onSignUpModal}
        onCloseModal={onCloseModal}
        onMenuModal={onMenuModal}
        currentPage={"Saved News"}
      />
      <SavedNewsInfo />
    </section>
  );
};

export default SavedNews;
