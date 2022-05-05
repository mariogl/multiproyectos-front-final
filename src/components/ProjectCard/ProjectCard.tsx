import { useCallback, useEffect, useState } from "react";
import ReactTimeAgo from "react-time-ago";
import Project from "../../types/project";
import { ReactComponent as TrelloLogo } from "../../img/trello-icon.svg";
import { ReactComponent as GithubLogo } from "../../img/github-icon.svg";
import { ReactComponent as UrlIcon } from "../../img/url.svg";
import { ReactComponent as SonarLogo } from "../../img/sonar-icon.svg";
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
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";

interface ProjectCardProps {
  project: Project;
  backgroundColor: {
    color: string;
    theme: string;
  };
}

const ProjectCard = ({
  project: { name, repo, prod, tutor, student, trello, sonarKey, sonarInfo },
  backgroundColor,
}: ProjectCardProps): JSX.Element => {
  const previews = useSelector((state: RootState) => state.ui.previews);

  const [validation, setValidation] = useState("ok");

  const validationURL = `https://validator.w3.org/nu/?doc=${prod.front}`;
  const sonarBadgetURL =
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
            {sonarKey?.front && (
              <a
                href={sonarURL}
                target="_blank"
                rel="noreferrer"
                title="SonarCloud"
              >
                {" "}
                <SonarLogo />
              </a>
            )}
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
          {sonarInfo && (
            <>
              <p>Code smells: {sonarInfo.codeSmells}</p>
              <p>Bugs: {sonarInfo.bugs}</p>
              <p>Debt: {sonarInfo.debt} minutes</p>
              <p
                className={`coverage ${
                  sonarInfo?.coverage >= 80 ? "good" : "danger"
                }`}
              >
                Coverage: {sonarInfo?.coverage}%
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
        </>
      )}
      {tutor && (
        <StyledTutor backgroundColor={backgroundColor} title={tutor.name}>
          {tutor.name.charAt(0).toUpperCase()}
        </StyledTutor>
      )}
      {sonarKey?.front && (
        <p>
          <a href={sonarURL} target="_blank" rel="noreferrer">
            <img src={`${sonarBadgetURL}&metric=alert_status`} alt="Sonar" />
          </a>
        </p>
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
