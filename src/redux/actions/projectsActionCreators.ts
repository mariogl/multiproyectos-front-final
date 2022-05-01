import {
  DeleteProjectAction,
  FilterProjectsAction,
  LoadProjectsAction,
} from "../../types/actions";
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

export const deleteProjectAction = (id: string): DeleteProjectAction => ({
  type: actionTypes.delete,
  id,
});
