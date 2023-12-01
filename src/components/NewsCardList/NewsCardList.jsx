import { useEffect, useState } from "react";
import NewsCard from "../NewsCard/NewsCard";
import "./NewsCardList.css";
import { useLocation } from "react-router-dom";

const NewsCardList = ({ children, cards, error, checkSaveStatus }) => {
  const location = useLocation();
  const [numberOfCards, setNumberOfCards] = useState(3);

  const [cardsToRender, setCardsToRender] = useState([{}]);
  useEffect(() => {
    if (location.pathname === "/") {
      setCardsToRender(cards);
    } else {
      console.log("saved-news");
      let newCards = cards?.map((card) => card.props);
      setCardsToRender(newCards);
    }
  }, [cards, location]);

  return (
    <div className="cardList">
      <div className="cardList__content">
        {location.pathname === "/" ? (
          <header className="cardList__title">Search results</header>
        ) : (
          <></>
        )}

        {children}
        {/* <div className="cardList__container-button"> */}
        {cards.length ? (
          <div className="cardList__container-button">
            {location.pathname === "/" ? (
              <>
                <div className="cardList__container">
                  {cardsToRender?.slice(0, numberOfCards).map((card, key) => (
                    <NewsCard
                      {...card}
                      key={key}
                      checkSaveStatus={checkSaveStatus}
                    />
                  ))}
                </div>
                <button
                  onClick={() => setNumberOfCards(numberOfCards + 3)}
                  className="cardList__more-button"
                >
                  Show more
                </button>
              </>
            ) : (
              <div className="cardList__container">
                {cardsToRender?.map((card, key) => (
                  <NewsCard
                    {...card}
                    key={key}
                    checkSaveStatus={checkSaveStatus}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          location.pathname === "/" && (
            <div className="cardList__container-button">
              {error ? (
                <h2 className="cardList__error cardList__title">
                  "Sorry, something went wrong during the request. There may be
                  a connection issue or the server may be down. Please try again
                  later."
                </h2>
              ) : (
                <h2 className="cardList__error cardList__title">
                  Sorry!! Nothing to show please try again with different words
                </h2>
              )}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default NewsCardList;
