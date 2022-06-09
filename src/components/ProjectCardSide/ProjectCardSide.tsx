import { ReactComponent as GithubLogo } from "../../img/github-icon.svg";
import { ReactComponent as UrlIcon } from "../../img/url.svg";
import { ReactComponent as HTML5Logo } from "../../img/html5-icon.svg";
import { ReactComponent as SonarLogo } from "../../img/sonar-icon.svg";
import {
  StyledDataPill,
  StyledDataPills,
  StyledSide,
  StyledSideHeader,
  StyledSideHeading,
  StyledSideIcons,
} from "../ProjectCard/ProjectCardStyled";
import ReactTimeAgo from "react-time-ago";
import { FaExclamation, FaTimes } from "react-icons/fa";
import Project from "../../types/project";
import SonarInfo from "../../types/sonarInfo";

interface ProjectCardSideProps {
  side: "back" | "front";
  sonarInfo: SonarInfo;
  sonarURL: string;
  sonarBadgetURL: string;
  infoRepo: any;
  validation: string;
  project: Project;
}

const ProjectCardSide = ({
  side,
  sonarInfo,
  sonarURL,
  sonarBadgetURL,
  infoRepo,
  validation,
  project: { prod, repo, sonarKey },
}: ProjectCardSideProps): JSX.Element => {
  const validationURL = `https://validator.w3.org/nu/?doc=${prod[side]}`;

  return (
    <StyledSide>
      <StyledSideHeader>
        <StyledSideHeading>
          {`${side[0].toUpperCase()}${side.slice(1)}`}{" "}
        </StyledSideHeading>
        <StyledSideIcons>
          <a
            href={prod[side]}
            target="_blank"
            rel="noreferrer"
            title="Producción"
          >
            <UrlIcon />
          </a>{" "}
          <a href={repo[side]} target="_blank" rel="noreferrer" title="GitHub">
            <GithubLogo />
          </a>{" "}
          {sonarKey && sonarKey[side] && (
            <a
              href={sonarURL}
              target="_blank"
              rel="noreferrer"
              title="SonarCloud"
            >
              {" "}
              <SonarLogo />
            </a>
          )}{" "}
          <a href={validationURL} target="_blank" rel="noreferrer">
            <HTML5Logo className={validation} />
          </a>
          {validation === "warnings" && (
            <FaExclamation className="subicon warnings" />
          )}
          {validation === "errors" && <FaTimes className="subicon errors" />}
        </StyledSideIcons>
      </StyledSideHeader>
      <StyledDataPills>
        <StyledDataPill>
          <p>
            Último commit:{" "}
            {infoRepo && infoRepo.commits && (
              <ReactTimeAgo
                date={new Date(infoRepo.commits.commit.author?.date)}
                locale="es"
              />
            )}
          </p>
          <p>
            Última PR abierta:{" "}
            {infoRepo &&
              infoRepo.pullRequests &&
              infoRepo.pullRequests.updated_at && (
                <a
                  href={infoRepo.pullRequests.html_url}
                  target="_blank"
                  rel="noreferrer"
                >
                  <ReactTimeAgo
                    date={new Date(infoRepo.pullRequests.updated_at)}
                    locale="es"
                    className={`${
                      new Date().getTime() -
                        new Date(infoRepo.pullRequests.updated_at).getTime() >
                      60 * 60 * 1000
                        ? "danger"
                        : ""
                    }`}
                  />
                </a>
              )}
          </p>
        </StyledDataPill>
        {sonarInfo && (
          <StyledDataPill>
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
            {sonarKey && sonarKey[side] && (
              <p>
                <a href={sonarURL} target="_blank" rel="noreferrer">
                  <img
                    src={`${sonarBadgetURL}&metric=alert_status`}
                    alt="Sonar"
                  />
                </a>
              </p>
            )}
          </StyledDataPill>
        )}
      </StyledDataPills>
    </StyledSide>
  );
};

export default ProjectCardSide;
