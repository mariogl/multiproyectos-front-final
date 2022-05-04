import { Action } from "../../types/actions";
import actionTypes from "../actions/actionTypes";

export interface UIState {
  previews: boolean;
}

const uiReducer = (
  ui: UIState = { previews: false },
  action: Action = { type: "" }
): UIState => {
  let newUI: UIState;

  switch (action.type) {
    case actionTypes.showPreviews:
      newUI = {
        ...ui,
        previews: true,
      };
      break;
    case actionTypes.hidePreviews:
      newUI = {
        ...ui,
        previews: false,
      };
      break;
    default:
      newUI = { ...ui };
  }

  return newUI;
};

export default uiReducer;
