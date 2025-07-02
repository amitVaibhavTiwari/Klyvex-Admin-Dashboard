// type for our default state
export type DefaultState = {
  user: null | {
    id: number;
    email: string;
    name: string;
  };
  theme: "dark" | "light";
};

// types for all the possible actions
export type SetThemeAction = {
  type: "setTheme";
  payload: "light" | "dark";
};
export type SetUser = {
  type: "setUser";
  payload: {
    id: number;
    email: string;
    name: string;
  } | null;
};

// union type for all the actions
export type ActionType = SetUser | SetThemeAction;

// this is the type of our context which we provide as type of our context.
export type TypeContext = DefaultState & {
  dispatch: React.Dispatch<ActionType>;
};
