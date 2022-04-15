import Challenge from "./challenges";

interface LoadChallengesAction {
  type: string;
  challenges: Challenge[];
}

export default LoadChallengesAction;
