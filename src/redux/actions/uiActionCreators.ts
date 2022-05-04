import { Action } from "../../types/actions";
import actionTypes from "./actionTypes";

export const showPreviewsAction = (): Action => ({
  type: actionTypes.showPreviews,
});

export const hidePreviewsAction = (): Action => ({
  type: actionTypes.hidePreviews,
});
