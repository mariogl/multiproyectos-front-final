import { combineReducers } from "redux";
import challengesReducer from "./challengesReducer";
import projectsReducer from "./projectsReducer";

const rootReducer = combineReducers({
  challenges: challengesReducer,
  projects: projectsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
