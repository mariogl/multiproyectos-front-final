import { LoadChallengesAction } from "../../types/actions";
import Challenge from "../../types/challenges";
import actionTypes from "./actionTypes";
import loadChallengesAction from "./challengesActionCreators";

describe("Given a loadChallengesAction function", () => {
  describe("When it receives a list of challenges", () => {
    test("Then it should return a load action with the list of challenges", () => {
      const challenges: Challenge[] = [
        {
          id: "1",
          name: "Challenge 1",
          date: new Date(),
        },
        {
          id: "2",
          name: "Challenge 2",
          date: new Date(),
        },
      ];

      const expectedAction: LoadChallengesAction = {
        type: actionTypes.loadChallenges,
        challenges,
      };

      const action = loadChallengesAction(challenges);

      expect(action).toEqual(expectedAction);
    });
  });
});
