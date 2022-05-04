import { combineReducers } from "redux";
import challengesReducer from "./challengesReducer";
import projectsReducer from "./projectsReducer";
import tutorsReducer from "./tutorsReducer";
import uiReducer from "./uiReducer";

const rootReducer = combineReducers({
  challenges: challengesReducer,
  projects: projectsReducer,
  tutors: tutorsReducer,
  ui: uiReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
