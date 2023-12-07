import SavedNewsInfo from "../SavedNewsInfo/SavedNewsInfo";

const SavedNews = ({
  onSignInModal,
  onSignUpModal,
  onCloseModal,
  onMenuModal,
}) => {
  return (
    <section>
      <SavedNewsInfo />
    </section>
  );
};

export default SavedNews;
