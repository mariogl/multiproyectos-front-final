import { useCallback, useEffect, useState } from "react";
import ReactTimeAgo from "react-time-ago";
import Project from "../../types/project";
import { ReactComponent as TrelloLogo } from "../../img/trello-icon.svg";
import { ReactComponent as GithubLogo } from "../../img/github-icon.svg";
import { ReactComponent as UrlIcon } from "../../img/url.svg";
import {
  StyledArticle,
  StyledLogo,
  StyledSide,
  StyledStudent,
  StyledTitle,
  StyledTutor,
} from "./ProjectCardStyled";
import ProdPreview from "../ProdPreview/ProdPreview";
import axios from "axios";
import useGitHub from "../../hooks/useGitHub";

interface ProjectCardProps {
  project: Project;
  backgroundColor: {
    color: string;
    theme: string;
  };
}

const ProjectCard = ({
  project: { name, repo, prod, tutor, student, trello, sonarKey },
  backgroundColor,
}: ProjectCardProps): JSX.Element => {
  const [infoSonarFront] = useState<any>(null);
  const [infoSonarBack] = useState<any>(null);
  const [validation, setValidation] = useState("ok");

  const validationURL = `https://validator.w3.org/nu/?doc=${prod.front}`;
  const sonarApiURL =
    sonarKey?.front &&
    `https://sonarcloud.io/api/project_badges/measure?project=${sonarKey.front}`;
  const sonarURL =
    sonarKey?.front &&
    `https://sonarcloud.io/project/overview?id=${sonarKey.front}`;

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
      {repo?.front && (
        <>
          <StyledSide>
            Front{" "}
            <a
              href={prod.front}
              target="_blank"
              rel="noreferrer"
              title="Producción"
            >
              <UrlIcon />
            </a>{" "}
            <a
              href={repo.front}
              target="_blank"
              rel="noreferrer"
              title="GitHub"
            >
              <GithubLogo />
            </a>
          </StyledSide>
          <p>
            Último commit:{" "}
            {infoRepoFront && infoRepoFront.commits && (
              <ReactTimeAgo
                date={new Date(infoRepoFront.commits.commit.author?.date)}
                locale="es"
              />
            )}
          </p>
          <p>
            Última PR abierta:{" "}
            {infoRepoFront &&
              infoRepoFront.pullRequests &&
              infoRepoFront.pullRequests.updated_at && (
                <a
                  href={infoRepoFront.pullRequests.html_url}
                  target="_blank"
                  rel="noreferrer"
                >
                  <ReactTimeAgo
                    date={new Date(infoRepoFront.pullRequests.updated_at)}
                    locale="es"
                    className={`${
                      new Date().getTime() -
                        new Date(
                          infoRepoFront.pullRequests.updated_at
                        ).getTime() >
                      60 * 60 * 1000
                        ? "danger"
                        : ""
                    }`}
                  />
                </a>
              )}
          </p>
          {prod.front && (
            <p>
              HTML validation:{" "}
              <a
                href={validationURL}
                target="_blank"
                rel="noreferrer"
                className={
                  validation === "errors"
                    ? "validation-errors"
                    : validation === "warnings"
                    ? "validation-warnings"
                    : ""
                }
              >
                {validation}
              </a>
            </p>
          )}
          {infoSonarFront && (
            <>
              <p>Code smells: {infoSonarFront.codeSmells}</p>
              <p className={infoSonarFront.coverage >= 80 ? "" : "danger"}>
                Coverage: {infoSonarFront.coverage}%
              </p>
            </>
          )}
        </>
      )}
      {repo?.back && (
        <>
          <StyledSide>
            Back{" "}
            <a
              href={`${process.env.REACT_APP_GIT_REPO_PREFIX}${repo.back}`}
              target="_blank"
              rel="noreferrer"
            >
              <GithubLogo />
            </a>
          </StyledSide>
          <p>
            Último commit:{" "}
            {infoRepoBack && (
              <ReactTimeAgo
                date={new Date(infoRepoBack.commits.commit.author?.date)}
                locale="es"
              />
            )}
          </p>
          {infoSonarBack && (
            <>
              <p>Code smells: {infoSonarBack.codeSmells}</p>
              <p className={infoSonarBack.coverage >= 80 ? "" : "danger"}>
                Coverage: {infoSonarBack.coverage}%
              </p>
            </>
          )}
        </>
      )}
      {tutor && (
        <StyledTutor backgroundColor={backgroundColor} title={tutor.name}>
          {tutor.name.charAt(0).toUpperCase()}
        </StyledTutor>
      )}
      {prod.front && <ProdPreview url={prod.front} />}
      {trello && (
        <StyledLogo>
          <a href={trello} target="_blank" rel="noreferrer" title="Trello">
            <TrelloLogo />
          </a>
        </StyledLogo>
      )}
      {sonarKey?.front && (
        <a href={sonarURL} target="_blank" rel="noreferrer">
          <img src={`${sonarApiURL}&metric=alert_status`} alt="Sonar" />
        </a>
      )}
    </StyledArticle>
  );
};

export default ProjectCard;
