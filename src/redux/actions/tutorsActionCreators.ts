import { LoadTutorsAction } from "../../types/actions";
import Tutor from "../../types/tutor";
import actionTypes from "./actionTypes";

export const loadTutorsAction = (tutors: Tutor[]): LoadTutorsAction => ({
  type: actionTypes.loadTutors,
  tutors,
});
