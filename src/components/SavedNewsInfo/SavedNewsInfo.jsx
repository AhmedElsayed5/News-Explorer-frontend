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
    if (!keywordState) kewordString += " None.";
    if (keywordState?.length === 1) kewordString += keywordState[0] + ".";
    if (keywordState?.length === 2)
      kewordString += keywordState[0] + " and " + keywordState[1] + ".";
    if (keywordState?.length > 2) {
      kewordString += keywordState[0];
      kewordString += ", ";
      kewordString += keywordState[1];
      kewordString += " and ";
      kewordString += keywordState?.length - 2;
      kewordString += " more.";
    }
    console.log(kewordString);
    return kewordString;
  };
  return (
    <div className="saved-news__info">
      <p className="saved-news__header">Saved articles</p>
      <div className="saved-news__description-container">
        <h1 className="saved-news__description">
          {currentUser?.email?.slice(0, 3).toUpperCase()}, you have{" "}
          {savedCardsState ? savedCardsState?.length : 0} saved articles
        </h1>
      </div>
      <div className="saved-news__conclusion">
        By keywords:
        <p className="saved-news__conclusion saved-news__conculusion-bold">
          {checkKeywords()}{" "}
        </p>
      </div>
      {/* </div> */}
    </div>
  );
};

export default SavedNewsInfo;
