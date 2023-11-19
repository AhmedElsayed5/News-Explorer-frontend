import { Children } from "react";
import NewsCard from "../NewsCard/NewsCard";
import "./NewsCardList.css";
const NewsCardList = ({ children, cards }) => {
  // cards.slice(0, 3);
  console.log(cards.length);

  return (
    <div className="cardList">
      <header className="cardList__title">Search results</header>
      {children}
      <div className="cardList__container-button">
        {cards.length ? (
          <div className="cardList__container">
            {cards?.slice(0, 3).map((card, key) => (
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
        ) : (
          <h2 className="cardList__error cardList__title">
            Sorry!! Nothing to show please try again with different words
          </h2>
        )}

        <button className="cardList__more-button">Show more</button>
      </div>
    </div>
  );
};

export default NewsCardList;
