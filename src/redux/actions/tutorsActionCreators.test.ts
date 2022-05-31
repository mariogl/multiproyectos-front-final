import { randomTutors } from "../../factories/tutors";
import actionTypes from "./actionTypes";
import { loadTutorsAction } from "./tutorsActionCreators";

describe("Given a loadTutorsAction function", () => {
  describe("When it's invoked with a list of tutors", () => {
    test("Then it should return a load action with the received tutors", () => {
      const tutors = randomTutors();
      const expectedAction = {
        type: actionTypes.loadTutors,
        tutors,
      };

      const action = loadTutorsAction(tutors);

      expect(action).toEqual(expectedAction);
    });
  });
});
