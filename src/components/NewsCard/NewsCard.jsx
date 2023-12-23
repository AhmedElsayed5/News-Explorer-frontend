import "./NewsCard.css";
import React, { useCallback, useContext, useEffect } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { SavedCardsContext } from "../../contexts/SavedCardsContext";
import bookMark from "../../images/bookmark.svg";
import bookMarkSaved from "../../images/bookmark-saved.svg";
import bookMarkHover from "../../images/bookMarkHover.svg";
import trash from "../../images/trash.svg";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const NewsCard = ({ card, unSave, save, onSignUpModal }) => {
  const location = useLocation();
  const [currentCard, setCurrentCard] = useState({});
  useEffect(() => {
    if (location.pathname === "/") {
      setCurrentCard({
        image: card?.urlToImage,
        date: card?.publishedAt,
        title: card?.title,
        description: card?.description,
        source: card?.source?.name,
        link: card?.url,
      });
    } else {
      setCurrentCard({
        image: card?.image,
        date: card?.date,
        title: card?.title,
        description: card?.text,
        source: card?.source,
        keyword: card?.keyword,
        link: card?.link,
      });
    }
  }, [
    location,
    card?.urlToImage,
    card?.publishedAt,
    card?.title,
    card?.description,
    card?.source?.name,
    card?.image,
    card?.date,
    card?.text,
    card?.source,
    card?.keyword,
    card?.link,
    card?.url,
  ]);

  const { link, keyword, source, title, date, description, image } =
    currentCard;

  const [isHovered, setHover] = useState(false);
  const { currentUser } = useContext(CurrentUserContext);
  const { savedCardsState } = useContext(SavedCardsContext);

  const [isSaved, setIsSaved] = useState();

  const check = useCallback(
    (item) => {
      return title === item?.title &&
        source === item?.source &&
        date === item?.date
        ? true
        : false;
    },
    [date, source, title]
  );

  useEffect(
    () => setIsSaved(savedCardsState?.some((item) => check(item))),
    [savedCardsState, title, date, source, check]
  );

  const unSaveProcess = () => {
    const item = savedCardsState.filter(check);
    unSave(item[0]._id);
  };

  const saveProcess = () => {
    save(card);
  };

  function formatDate(string) {
    var options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(string).toLocaleDateString([], options);
  }

  const checkDirections = () => {
    isSaved ? unSaveProcess() : saveProcess();
  };

  return (
    <div className="card">
      {location.pathname === "/" ? (
        // home
        <div
          className="card__save-button-container"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <div
            className={
              !currentUser?.email & isHovered
                ? `card__save-button-message-container`
                : `card__save-button-message-container-hidden`
            }
          >
            <p className={`card__save-button-message`}>
              Sign in to save articles
            </p>
          </div>
          <button className="card__save-button">
            {currentUser?.email && location.pathname === "/" ? (
              <img
                className="card__save-button-image"
                src={isSaved ? bookMarkSaved : bookMark}
                alt="save-button"
                onClick={() => {
                  checkDirections();
                }}
              />
            ) : (
              <div
                onMouseEnter={() => currentUser?.email && setHover(true)}
                onMouseLeave={() => currentUser?.email && setHover(false)}
              >
                <img
                  className="card__save-button-image"
                  src={isHovered ? bookMarkHover : bookMark}
                  alt="save-button"
                  // if saved delete if not add to save
                  onClick={() => {
                    onSignUpModal();
                    // unSave();
                    // currentUser?.email && checkSaveStatus({ ...props });
                  }}
                />
              </div>
            )}
          </button>
        </div>
      ) : (
        <>
          <div className="card__keyword">
            <p className="card__keyword-title">{keyword}</p>
          </div>
          <div
            className="card__save-button-container"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            <div
              className={
                currentUser?.email && isHovered
                  ? `card__save-button-message-container`
                  : `card__save-button-message-container-hidden`
              }
            >
              <p className={`card__save-button-message`}>Remove from saved</p>
            </div>
            <button className="card__save-button">
              <img
                className="card__save-button-image"
                src={trash}
                alt="save-button"
                // delete
                onClick={() => {
                  checkDirections();
                  // checkSaveStatus({ ...props });
                }}
              />
            </button>
          </div>
        </>
      )}

      <img className="card__image" src={image} alt="card" />
      <div className="card__info">
        <h2 className="card__publish-date">{formatDate(date)}</h2>
        <div className="card__tittle-padding">
          <a
            className="footer__icons-link"
            href={link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <p className="card__tilte">{title}</p>
          </a>
        </div>
        <p className="card__description">{description}</p>

        <p className="card__source">{source}</p>
      </div>
    </div>
  );
};

export default NewsCard;
