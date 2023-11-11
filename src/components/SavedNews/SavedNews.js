import Header from "../Header/Header";
const SavedNews = ({ onSignInModal, onSignUpModal, onCloseModal }) => {
  return (
    <div>
      <Header
        onSignInModal={onSignInModal}
        onSignUpModal={onSignUpModal}
        onCloseModal={onCloseModal}
      />
      <div>Saved News</div>
    </div>
  );
};

export default SavedNews;
