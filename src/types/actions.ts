import Challenge from "./challenges";
import Project from "./project";

export interface Action {
  type: string;
}

export interface LoadChallengesAction extends Action {
  challenges: Challenge[];
}

export interface LoadProjectsAction extends Action {
  projects: Project[];
}

export interface FilterProjectsAction extends Action {
  filter: string;
}
