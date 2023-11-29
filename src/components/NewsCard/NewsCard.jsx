import "./NewsCard.css";
import React, { useContext, useEffect } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { SavedCardsContext } from "../../contexts/SavedCardsContext";
import bookMark from "../../images/bookmark.svg";
import bookMarkSaved from "../../images/bookmark-saved.svg";
import { useState } from "react";

const NewsCard = (props) => {
  const {
    source,
    title,
    publishedAt,
    description,
    urlToImage,
    checkSaveStatus,
  } = props;
  const [isHovered, setHover] = useState(false);
  const { currentUser } = useContext(CurrentUserContext);
  const { savedCardsState } = useContext(SavedCardsContext);

  const [isSaved, setIsSaved] = useState(
    savedCardsState
      ? savedCardsState?.some((item) => title === item.title)
      : false
  );

  useEffect(
    () => setIsSaved(savedCardsState?.some((item) => title === item.title)),
    [savedCardsState, title]
  );
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
            isHovered && !currentUser.email
              ? `card__save-button-message-container`
              : `card__save-button-message-container-hidden`
          }
        >
          <p className={`card__save-button-message`}>
            Sign in to save articles
          </p>
        </div>
        <button className="card__save-button">
          {isSaved && currentUser.email ? (
            <img
              className="card__save-button-image"
              src={bookMarkSaved}
              alt="save-button"
              onClick={() => {
                currentUser.email && checkSaveStatus(title);
              }}
            />
          ) : (
            <img
              className="card__save-button-image"
              src={bookMark}
              alt="save-button"
              onClick={() => {
                currentUser.email && checkSaveStatus({ ...props });
              }}
            />
          )}
        </button>
      </div>

      <img className="card__image" src={urlToImage} alt="card" />
      <div className="card__info">
        <h2 className="card__publish-date">{formatDate(publishedAt)}</h2>
        <div className="card__tittle-padding">
          <p className="card__tilte">{title}</p>
        </div>
        <p className="card__description">{description}</p>
        <p className="card__source">{source.name}</p>
      </div>
    </div>
  );
};

export default NewsCard;
