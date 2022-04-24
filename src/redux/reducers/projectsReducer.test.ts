import { randomProjects } from "../../factories/project";
import { Action, LoadProjectsAction } from "../../types/actions";
import Project from "../../types/project";
import actionTypes from "../actions/actionTypes";
import projectsReducer, { ProjectsState } from "./projectsReducer";

describe("Given a projectsReducer function", () => {
  describe("When it receives a load action with a list of projects", () => {
    test("Then it should return the received list of projects", () => {
      const initialProjects: ProjectsState = { list: [], filterBy: "" };
      const newProjects: Project[] = randomProjects();
      const action: LoadProjectsAction = {
        type: actionTypes.loadProjects,
        projects: newProjects,
      };

      const newState = projectsReducer(initialProjects, action);

      expect(newState.list).toEqual(newProjects);
    });
  });

  describe("When it receives an unknown action", () => {
    test("Then it should return the previous list of projects", () => {
      const initialProjects: ProjectsState = {
        list: randomProjects(),
        filterBy: "",
      };
      const action: Action = {
        type: "test",
      };

      const newState = projectsReducer(initialProjects, action);

      expect(newState).toEqual(initialProjects);
    });
  });

  describe("When it receives nothing", () => {
    test("Then it should return an empty list", () => {
      const newState = projectsReducer();
      const expectedState = {
        list: [],
        filterBy: "",
      };

      expect(newState).toEqual(expectedState);
    });
  });
});
