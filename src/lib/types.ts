// type for our default state
export type DefaultState = {
  count: number;
  theme: "dark" | "light";
  status: string;
};

// Types for all the possible actions
export type UpdateCountAction = {
  type: "increment" | "decrement" | "reset";
};
export type SetStatusAction = {
  type: "setStatus";
  payload: "active" | "inactive";
};
export type SetThemeAction = {
  type: "setTheme";
  payload: "light" | "dark";
};

// Union type for all the actions
export type ActionType = UpdateCountAction | SetStatusAction | SetThemeAction;

// This is the type of our context which we provide as type of our context.
export type TypeContext = DefaultState & {
  dispatch: React.Dispatch<ActionType>;
};
