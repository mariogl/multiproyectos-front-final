import { combineReducers } from "redux";
import challengesReducer from "./challengesReducer";

const rootReducer = combineReducers({
  challenges: challengesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
