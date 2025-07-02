import { createContext, useContext, useReducer } from "react";
import { type ActionType, type TypeContext, type DefaultState } from "./types";

const initialState: DefaultState = {
  user: null,
  theme: "light",
};

const reducer = (state: DefaultState, action: ActionType): DefaultState => {
  switch (action.type) {
    case "setUser":
      return { ...state, user: action.payload };
    case "setTheme":
      localStorage.setItem("userPreferredTheme", action.payload);
      return { ...state, theme: action.payload };
    default: {
      const unhandledActionType: never = action;
      throw new Error(`Unexpected action type ${unhandledActionType}.`);
    }
  }
};

const globalContext = createContext<TypeContext>({
  ...initialState,
  dispatch: () => null,
});

// a custom hook to access dispatch and state values throughout the application.
// eslint-disable-next-line react-refresh/only-export-components
export const useGlobalContext = () => useContext(globalContext);

const GlobalContext = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <globalContext.Provider value={{ ...state, dispatch }}>
      {children}
    </globalContext.Provider>
  );
};

export default GlobalContext;
