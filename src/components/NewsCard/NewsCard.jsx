// import cat from "../../images/cat.svg";
import "./NewsCard.css";
import bookMark from "../../images/bookmark.svg";
import { useState } from "react";

const NewsCard = ({
  source_name,
  title,
  publishedAt,
  description,
  urlToImage,
}) => {
  // const [like, setLike] = useState(false);
  // // to convert dates
  // const changelike = () => {
  //   setLike(!like);
  // };
  const [isHovered, setHover] = useState(false);
  function formatDate(string) {
    var options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(string).toLocaleDateString([], options);
  }

  return (
    <div className="card">
      <div
        className="card__save-button-container"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div
          className={
            isHovered
              ? `card__save-button-message-container`
              : `card__save-button-message-container-hidden`
          }
        >
          <p className={`card__save-button-message`}>
            Sign in to save articles
          </p>
        </div>
        <button className="card__save-button">
          <img
            className="card__save-button-image"
            src={bookMark}
            alt="save-button"
          />
        </button>
      </div>

      <img className="card__image" src={urlToImage} alt="card" />
      <div className="card__info">
        <h2 className="card__publish-date">{formatDate(publishedAt)}</h2>
        <div className="card__tittle-padding">
          <p className="card__tilte">{title}</p>
        </div>
        <p className="card__description">{description}</p>
        <p className="card__source">{source_name}</p>
      </div>
    </div>
  );
};

export default NewsCard;
