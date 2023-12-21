import { useState } from "react";
import NewsCard from "../NewsCard/NewsCard";
import "./NewsCardList.css";
import { useLocation } from "react-router-dom";

const NewsCardList = ({
  children,
  cards,
  error,
  unSave,
  save,
  onSignUpModal,
}) => {
  const location = useLocation();
  const [numberOfCards, setNumberOfCards] = useState(3);
  return (
    <section className="card-list">
      <div className="card-list__content">
        {location.pathname === "/" ? (
          <h1 className="card-list__title">Search results</h1>
        ) : (
          <></>
        )}

        {children}
        {/* <div className="card-list__container-button"> */}
        {cards.length ? (
          //home
          <div className="card-list__container-button">
            {location.pathname === "/" ? (
              <>
                <div className="card-list__container">
                  {cards?.slice(0, numberOfCards).map((item, key) => (
                    <NewsCard
                      card={item}
                      key={key}
                      unSave={unSave}
                      save={save}
                      onSignUpModal={onSignUpModal}
                    />
                  ))}
                </div>
                <div className="card-list__more-button-container">
                  <button
                    onClick={() => setNumberOfCards(numberOfCards + 3)}
                    className="card-list__more-button"
                  >
                    Show more
                  </button>
                </div>
              </>
            ) : (
              // saved news page
              <div className="card-list__container">
                {cards?.map((item, key) => (
                  <NewsCard
                    card={item}
                    key={key}
                    unSave={unSave}
                    // checkSaveStatus={checkSaveStatus}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          location.pathname === "/" && (
            <div className="card-list__container-button">
              {error ? (
                <h2 className="card-list__error card-list__title">
                  "Sorry, something went wrong during the request. There may be
                  a connection issue or the server may be down. Please try again
                  later."
                </h2>
              ) : (
                <h2 className="card-list__error card-list__title">
                  Sorry!! Nothing to show please try again with different words
                </h2>
              )}
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default NewsCardList;
