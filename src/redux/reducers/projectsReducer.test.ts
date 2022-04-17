import { randomProjects } from "../../factories/project";
import { Action, LoadProjectsAction } from "../../types/actions";
import Project from "../../types/project";
import actionTypes from "../actions/actionTypes";
import projectsReducer from "./projectsReducer";

describe("Given a projectsReducer function", () => {
  describe("When it receives a load action with a list of projects", () => {
    test("Then it should return the received list of projects", () => {
      const initialProjects: Project[] = [];
      const newProjects: Project[] = randomProjects();
      const action: LoadProjectsAction = {
        type: actionTypes.loadProjects,
        projects: newProjects,
      };

      const newState = projectsReducer(initialProjects, action);

      expect(newState).toEqual(newProjects);
    });
  });

  describe("When it receives an unknown action", () => {
    test("Then it should return the previous list of projects", () => {
      const initialProjects: Project[] = randomProjects();
      const action: Action = {
        type: "test",
      };

      const newState = projectsReducer(initialProjects, action);

      expect(newState).toEqual(initialProjects);
    });
  });
});
