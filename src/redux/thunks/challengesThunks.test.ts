import axios from "axios";
import { randomChallenges } from "../../factories/challenge";
import Challenge from "../../types/challenges";
import { loadChallengesThunk } from "./challengesThunks";

jest.mock("axios");

describe("Given a loadChallengesThunk function", () => {
  describe("When it's invoked", () => {
    test("Then it should invoke dispatch with a load challenges action with a list of challenges", async () => {
      const dispatch = jest.fn();
      const challenges: Challenge[] = randomChallenges();

      axios.get = jest.fn().mockResolvedValue({ data: { challenges } });

      const actualThunk = loadChallengesThunk();
      await actualThunk(dispatch);

      expect(dispatch).toHaveBeenCalled();
    });
  });
});
