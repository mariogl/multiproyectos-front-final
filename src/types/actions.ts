import Challenge from "./challenges";

export interface Action {
  type: string;
}

export interface LoadChallengesAction {
  type: string;
  challenges: Challenge[];
}
