import { Action, LoadChallengesAction } from "../../types/actions";
import Challenge from "../../types/challenges";
import actionTypes from "../actions/actionTypes";

const challengesReducer = (
  challenges: Challenge[] = [],
  action: Action = { type: "" }
): Challenge[] => {
  let newChallenges: Challenge[];

  switch (action.type) {
    case actionTypes.load:
      newChallenges = [...(action as LoadChallengesAction).challenges];
      break;
    default:
      newChallenges = challenges;
  }

  return newChallenges;
};

export default challengesReducer;
