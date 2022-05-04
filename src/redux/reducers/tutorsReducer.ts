import { Action, LoadTutorsAction } from "../../types/actions";
import Tutor from "../../types/tutor";
import actionTypes from "../actions/actionTypes";

const tutorsReducer = (
  tutors: Tutor[] = [],
  action: Action = { type: "" }
): Tutor[] => {
  let newTutors: Tutor[];

  switch (action.type) {
    case actionTypes.loadTutors:
      newTutors = [...(action as LoadTutorsAction).tutors];
      break;
    default:
      newTutors = tutors;
  }

  return newTutors;
};

export default tutorsReducer;
