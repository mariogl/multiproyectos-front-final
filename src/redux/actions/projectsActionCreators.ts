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

export const filterProjectsByTutorAction = (
  filter = ""
): FilterProjectsAction => ({
  type: actionTypes.filterByTutor,
  filter,
});

export const filterProjectsByCoverageAction = (
  filter = ""
): FilterProjectsAction => ({
  type: actionTypes.filterByCoverage,
  filter,
});

export const deleteProjectAction = (id: string): DeleteProjectAction => ({
  type: actionTypes.delete,
  id,
});
