import { useCallback, useEffect, useState } from "react";
import Project from "../../types/project";
import { ReactComponent as TrelloLogo } from "../../img/trello-icon.svg";
import {
  StyledArticle,
  StyledLogo,
  StyledSides,
  StyledStudent,
  StyledTitle,
  StyledTutor,
} from "./ProjectCardStyled";
import ProdPreview from "../ProdPreview/ProdPreview";
import axios from "axios";
import useGitHub from "../../hooks/useGitHub";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";
import sonarURLs from "../../utils/sonarURLs";
import ProjectCardSide from "../ProjectCardSide/ProjectCardSide";

interface ProjectCardProps {
  project: Project;
  backgroundColor: {
    color: string;
    theme: string;
  };
}

const ProjectCard = ({
  project: {
    name,
    repo,
    prod,
    tutor,
    student,
    trello,
    sonarKey,
    sonarInfoFront,
    sonarInfoBack,
  },
  project,
  backgroundColor,
}: ProjectCardProps): JSX.Element => {
  const { previews, compactMode } = useSelector((state: RootState) => state.ui);

  const [validation, setValidation] = useState("ok");

  const validationURL = `https://validator.w3.org/nu/?doc=${prod.front}`;

  const {
    sonarURLfront,
    sonarURLback,
    sonarBadgetURLfront,
    sonarBadgetURLback,
  } = sonarURLs(sonarKey);

  const { infoRepoBack, infoRepoFront, getInfoRepo } = useGitHub(repo);

  const getValidation = useCallback(async () => {
    interface Data {
      messages: any[];
    }

    const {
      data: { messages },
    } = await axios.get<Data>(`${validationURL}&out=json`);
    const errors = messages.filter((message) => message.type === "error");
    const warnings = messages.filter((message) => message.type === "info");
    if (errors.length > 0) {
      setValidation("errors");
    } else if (warnings.length > 0) {
      setValidation("warnings");
    } else {
      setValidation("ok");
    }
  }, [validationURL]);

  useEffect(() => {
    getInfoRepo();
    if (prod.front) {
      getValidation();
    }
  }, [getInfoRepo, getValidation, prod.front]);

  return (
    <StyledArticle backgroundColor={backgroundColor}>
      <StyledStudent>{student}</StyledStudent>
      <StyledTitle>{name} </StyledTitle>
      <StyledSides compactMode={compactMode}>
        {repo?.front && (
          <ProjectCardSide
            side="front"
            project={project}
            infoRepo={infoRepoFront}
            sonarInfo={sonarInfoFront}
            sonarURL={sonarURLfront}
            sonarBadgetURL={sonarBadgetURLfront}
            validation={validation}
          />
        )}
        {repo?.back && (
          <ProjectCardSide
            side="back"
            project={project}
            infoRepo={infoRepoBack}
            sonarInfo={sonarInfoBack}
            sonarURL={sonarURLback}
            sonarBadgetURL={sonarBadgetURLback}
            validation={validation}
          />
        )}
      </StyledSides>
      {tutor && (
        <StyledTutor backgroundColor={backgroundColor} title={tutor.name}>
          {tutor.name.charAt(0).toUpperCase()}
        </StyledTutor>
      )}

      {prod.front && previews && <ProdPreview url={prod.front} />}
      {trello && (
        <StyledLogo>
          <a href={trello} target="_blank" rel="noreferrer" title="Trello">
            <TrelloLogo />
          </a>
        </StyledLogo>
      )}
    </StyledArticle>
  );
};

export default ProjectCard;
