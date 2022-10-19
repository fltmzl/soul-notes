import { createContext, useReducer, useState } from "react";

const INITIAL_VALUE = {
  isFormOpen: false,
  isFormUpdate: false,
};

export const NoteFormContext = createContext(INITIAL_VALUE);

const noteFormReducer = (state, action) => {
  switch (action.type) {
    case "OPEN_AND_CHANGE_TO_NEW_FORM":
      return {
        isFormOpen: true,
        isFormUpdate: false,
      };
    case "OPEN_AND_CHANGE_TO_UPDATE_FORM":
      return {
        isFormOpen: true,
        isFormUpdate: true,
      };
    case "TOGGLE_FORM":
      return {
        ...state,
        isFormOpen: !state.isFormOpen,
      };
    default:
      break;
  }
};

export const NoteFormContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(noteFormReducer, INITIAL_VALUE);

  const providerValue = {
    state,
    dispatch,
  };

  return <NoteFormContext.Provider value={providerValue}>{children}</NoteFormContext.Provider>;
};
