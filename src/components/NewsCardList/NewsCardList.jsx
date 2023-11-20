import { useState } from "react";
import NewsCard from "../NewsCard/NewsCard";
import "./NewsCardList.css";
const NewsCardList = ({ children, cards, error }) => {
  const [numberOfCards, setNumberOfCards] = useState(3);

  return (
    <div className="cardList">
      <header className="cardList__title">Search results</header>
      {children}
      {console.log(error)}
      {/* <div className="cardList__container-button"> */}
      {cards.length ? (
        <div className="cardList__container-button">
          <div className="cardList__container">
            {cards?.slice(0, numberOfCards).map((card, key) => (
              <NewsCard
                key={key}
                source_name={card.source.name}
                title={card.title}
                publishedAt={card.publishedAt}
                description={card.description}
                urlToImage={card.urlToImage}
              />
            ))}
          </div>
          <button
            onClick={() => setNumberOfCards(numberOfCards + 3)}
            className="cardList__more-button"
          >
            Show more
          </button>
        </div>
      ) : (
        <div className="cardList__container-button">
          {error ? (
            <h2 className="cardList__error cardList__title">
              "Sorry, something went wrong during the request. There may be a
              connection issue or the server may be down. Please try again
              later."
            </h2>
          ) : (
            <h2 className="cardList__error cardList__title">
              Sorry!! Nothing to show please try again with different words
            </h2>
          )}
        </div>
      )}
      {/* </div> */}
    </div>
  );
};

export default NewsCardList;
