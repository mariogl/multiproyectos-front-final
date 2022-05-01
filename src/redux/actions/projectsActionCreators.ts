import { FilterProjectsAction, LoadProjectsAction } from "../../types/actions";
import Project from "../../types/project";
import actionTypes from "./actionTypes";

export const loadProjectsAction = (
  projects: Project[]
): LoadProjectsAction => ({
  type: actionTypes.loadProjects,
  projects,
});

export const filterProjectsAction = (filter = ""): FilterProjectsAction => ({
  type: actionTypes.filter,
  filter,
});

export default loadProjectsAction;
