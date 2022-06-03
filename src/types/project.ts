import SonarInfo from "./sonarInfo";

interface Project {
  id: string;
  challenge: string;
  name: string;
  student: string;
  trello: string;
  sonarKey: {
    front: string;
    back: string;
  };
  sonarInfoBack: SonarInfo;
  sonarInfoFront: SonarInfo;
  tutor: {
    id: string;
    name: string;
  };
  repo: {
    front: string;
    back: string;
  };
  prod: {
    front: string;
    back: string;
  };
}

export default Project;
