import Header from "../Header/Header";

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
    </div>
  );
};

export default SavedNews;
