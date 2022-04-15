import { LoadChallengesAction } from "../../types/actions";
import Challenge from "../../types/challenges";
import actionTypes from "./actionTypes";

const loadChallengesAction = (
  challenges: Challenge[]
): LoadChallengesAction => ({
  type: actionTypes.load,
  challenges,
});

export default loadChallengesAction;
