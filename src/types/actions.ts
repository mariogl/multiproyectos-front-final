import Challenge from "./challenges";
import Project from "./project";
import SonarInfo from "./sonarInfo";
import Tutor from "./tutor";

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

export interface DeleteProjectAction extends Action {
  id: string;
}

export interface SetSonarInfoAction extends Action {
  id: string;
  sonarInfo: SonarInfo;
}
export interface LoadTutorsAction extends Action {
  tutors: Tutor[];
}
