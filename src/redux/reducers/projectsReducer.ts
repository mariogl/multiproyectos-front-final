import { Action, LoadProjectsAction } from "../../types/actions";
import Project from "../../types/project";
import actionTypes from "../actions/actionTypes";

export interface ProjectsState {
  list: Project[];
  filterBy: string;
}

const projectsReducer = (
  projects: ProjectsState = {
    list: [],
    filterBy: "",
  },
  action: Action = { type: "" }
): ProjectsState => {
  let newProjects: ProjectsState;

  switch (action.type) {
    case actionTypes.loadProjects:
      newProjects = {
        ...projects,
        list: [...(action as LoadProjectsAction).projects],
      };
      break;
    default:
      newProjects = projects;
  }

  return newProjects;
};

export default projectsReducer;
