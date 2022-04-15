import { composeWithDevTools } from "@redux-devtools/extension/lib/types/logOnly";
import { createStore } from "redux";
import rootReducer from "../reducers";

const store = createStore(rootReducer, composeWithDevTools());

export default store;
