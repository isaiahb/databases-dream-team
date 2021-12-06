import React from "react";

export const reducer = (state: any, action: any) => {
  console.log("reducer state, action: ", state, action);
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };

    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

export const initialState = {
  isAuthenticated: false,
  user: null,
  dispatch: reducer,
};

export const AuthContext = React.createContext<any>({}); // added this
 