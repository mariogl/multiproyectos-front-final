import {
  Action,
  FilterProjectsAction,
  LoadProjectsAction,
} from "../../types/actions";
import Project from "../../types/project";
import actionTypes from "../actions/actionTypes";

export interface ProjectsState {
  list: Project[];
  filterByTutor: string;
  filterByCoverage: string;
}

const projectsReducer = (
  projects: ProjectsState = {
    list: [],
    filterByTutor: "",
    filterByCoverage: "",
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
    case actionTypes.filterByTutor:
      newProjects = {
        ...projects,
        filterByTutor: (action as FilterProjectsAction).filter,
      };
      break;
    case actionTypes.filterByCoverage:
      newProjects = {
        ...projects,
        filterByCoverage: (action as FilterProjectsAction).filter,
      };
      break;
    default:
      newProjects = { ...projects };
  }

  return newProjects;
};

export default projectsReducer;
