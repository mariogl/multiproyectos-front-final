import { randomChallenges } from "../../factories/challenge";
import { Action, LoadChallengesAction } from "../../types/actions";
import Challenge from "../../types/challenges";
import actionTypes from "../actions/actionTypes";
import challengesReducer from "./challengesReducer";

describe("Given a challengesReducer function", () => {
  describe("When it receives a load action with a list of challenges", () => {
    test("Then it should return the received list of challenges", () => {
      const initialChallenges: Challenge[] = [];
      const newChallenges: Challenge[] = randomChallenges();
      const action: LoadChallengesAction = {
        type: actionTypes.loadChallenges,
        challenges: newChallenges,
      };

      const newState = challengesReducer(initialChallenges, action);

      expect(newState).toEqual(newChallenges);
    });
  });

  describe("When it receives an unknown action", () => {
    test("Then it should return the previous list of challenges", () => {
      const initialChallenges: Challenge[] = randomChallenges();
      const action: Action = {
        type: "test",
      };

      const newState = challengesReducer(initialChallenges, action);

      expect(newState).toEqual(initialChallenges);
    });
  });
});
