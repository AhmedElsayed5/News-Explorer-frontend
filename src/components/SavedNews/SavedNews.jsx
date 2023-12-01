import Header from "../Header/Header";
import SavedNewsInfo from "../SavedNewsInfo/SavedNewsInfo";

const SavedNews = ({
  onSignInModal,
  onSignUpModal,
  onCloseModal,
  onMenuModal,
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
      <SavedNewsInfo />
    </div>
  );
};

export default SavedNews;
