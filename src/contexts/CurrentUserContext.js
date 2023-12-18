import React from "react";

const CurrentUserContext = React.createContext({
  currentUser: {},
  setCurrentUserFun: () => {},
});

export { CurrentUserContext };
