import { LoadProjectsAction } from "../../types/actions";
import Project from "../../types/project";
import actionTypes from "./actionTypes";
import loadProjectsAction from "./projectsActionCreators";

describe("Given a loadProjectsAction function", () => {
  describe("When it receives a list of projects", () => {
    test("Then it should return a load action with the list of projects", () => {
      const projects: Project[] = [
        {
          id: "1",
          name: "Project 1",
          challenge: "w1ch1",
          student: "Student 1",
          repo: {
            back: "",
            front: "",
          },
          sonarqubeKey: {
            front: "",
            back: "",
          },
          trello: "",
          tutor: { id: "", name: "" },
        },
        {
          id: "2",
          name: "Project 2",
          challenge: "w1ch1",
          student: "Student 2",
          repo: {
            back: "",
            front: "",
          },
          sonarqubeKey: {
            front: "",
            back: "",
          },
          trello: "",
          tutor: { id: "", name: "" },
        },
      ];

      const expectedAction: LoadProjectsAction = {
        type: actionTypes.loadProjects,
        projects,
      };

      const action = loadProjectsAction(projects);

      expect(action).toEqual(expectedAction);
    });
  });
});
