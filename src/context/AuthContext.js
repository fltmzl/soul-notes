import { auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useReducer, useState } from "react";

const INITIAL_VALUE = {
  user: null,
};

export const AuthContext = createContext(INITIAL_VALUE);

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        user: action.payload,
      };
    case "LOGOUT":
      return {
        user: null,
      };
    default:
      break;
  }
};

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, INITIAL_VALUE);
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (data) => {
      if (data) {
        dispatch({ type: "LOGIN", payload: { uid: data.uid, email: data.email } });
        setLoadingAuth(false);
      } else {
        dispatch({ type: "LOGOUT" });
        setLoadingAuth(false);
      }
    });
  }, []);

  const providerValue = {
    user: state.user,
    loadingAuth,
    dispatch,
  };

  return <AuthContext.Provider value={providerValue}>{children}</AuthContext.Provider>;
};
