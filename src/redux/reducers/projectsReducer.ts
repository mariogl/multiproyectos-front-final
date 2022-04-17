import { Action, LoadProjectsAction } from "../../types/actions";
import Project from "../../types/project";
import actionTypes from "../actions/actionTypes";

const projectsReducer = (
  projects: Project[] = [],
  action: Action = { type: "" }
): Project[] => {
  let newProjects: Project[];

  switch (action.type) {
    case actionTypes.loadProjects:
      newProjects = [...(action as LoadProjectsAction).projects];
      break;
    default:
      newProjects = projects;
  }

  return newProjects;
};

export default projectsReducer;
