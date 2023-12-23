import React, { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { SavedCardsContext } from "../../contexts/SavedCardsContext.js";
import "./SavedNewsInfo.css";

const SavedNewsInfo = () => {
  const { currentUser } = useContext(CurrentUserContext);
  const { savedCardsState } = useContext(SavedCardsContext);
  const [keywordState, setKeyWordState] = useState([]);
  useEffect(() => {
    const keywordList = savedCardsState
      .map((item) => item.keyword)
      .filter(
        (keyword, index, self) => self.findIndex((t) => t === keyword) === index
      );
    setKeyWordState(keywordList);
  }, [savedCardsState]);

  const checkKeywords = () => {
    let kewordString = "";
    if (keywordState?.length === 0) kewordString += " None";
    if (keywordState?.length === 1) kewordString += keywordState[0];
    if (keywordState?.length === 2)
      kewordString += keywordState[0] + " and " + keywordState[1];
    if (keywordState?.length > 2) {
      kewordString += keywordState[0];
      kewordString += ", ";
      kewordString += keywordState[1];
      kewordString += " and ";
      kewordString += keywordState?.length - 2;
      kewordString += " more";
    }
    return kewordString;
  };
  return (
    <section className="saved-news-page">
      <p className="saved-news-page__header">Saved articles</p>
      <div className="saved-news-page__description-container">
        <h1 className="saved-news-page__description">
          {currentUser?.email?.slice(0, 3).toUpperCase()},you have{" "}
          {savedCardsState ? savedCardsState?.length : 0} saved articles
        </h1>
      </div>
      <div className="saved-news-page__conclusion">
        By keywords:{" "}
        <i className="saved-news-page__conclusion saved-news-page__conculusion-bold">
          {checkKeywords()}
        </i>
      </div>
    </section>
  );
};

export default SavedNewsInfo;
