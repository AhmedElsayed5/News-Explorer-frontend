import Header from "../Header/Header";
import SavedNewsAbout from "../SavedNewsInfo/SavedNewsInfo";

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
      <SavedNewsAbout />
    </div>
  );
};

export default SavedNews;
