import { useCallback, useEffect, useState } from "react";
import ReactTimeAgo from "react-time-ago";
import Project from "../../types/project";
import trelloLogo from "../../img/trello.svg";
import { ReactComponent as GithubLogo } from "../../img/github-icon.svg";
import { ReactComponent as UrlIcon } from "../../img/url.svg";
import { ReactComponent as W3CIcon } from "../../img/w3c-icon.svg";
import { Octokit } from "@octokit/rest";
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

interface ProjectCardProps {
  project: Project;
  backgroundColor: {
    color: string;
    theme: string;
  };
}

const octokit = new Octokit({ auth: process.env.REACT_APP_GITHUB_TOKEN });

const ProjectCard = ({
  project: { id, name, repo, prod, tutor, student, trello, sonarqubeKey },
  backgroundColor,
}: ProjectCardProps): JSX.Element => {
  const [infoRepoFront, setInfoRepoFront] = useState<any>(null);
  const [infoRepoBack, setInfoRepoBack] = useState<any>(null);
  const [infoSonarFront, setInfoSonarFront] = useState<any>(null);
  const [infoSonarBack, setInfoSonarBack] = useState<any>(null);
  const [showFrontProdPreview, setShowFrontProdPreview] = useState(true);
  const [validation, setValidation] = useState("ok");

  const [repoFrontOwner, repoFrontName] = repo.front
    .replace("https://github.com/", "")
    .split("/");

  const [repoBackOwner, repoBackName] = repo.back
    .replace("https://github.com/", "")
    .split("/");

  const getInfoRepo = useCallback(async () => {
    const lastCommitFrontPromise = repo.front
      ? octokit.request("GET /repos/{owner}/{repo}/commits", {
          owner: repoFrontOwner,
          repo: repoFrontName,
          per_page: 1,
        })
      : { data: [null] };

    const lastCommitBackPromise = repo.back
      ? octokit.request("GET /repos/{owner}/{repo}/commits", {
          owner: repoBackOwner,
          repo: repoBackName,
          per_page: 1,
        })
      : { data: [null] };

    const lastPullRequestFrontPromise = repo.front
      ? octokit.request("GET /repos/{owner}/{repo}/pulls", {
          owner: repoFrontOwner,
          repo: repoFrontName,
          per_page: 1,
        })
      : { data: [null] };

    const lastPullRequestBackPromise = repo.back
      ? octokit.request("GET /repos/{owner}/{repo}/pulls", {
          owner: repoBackOwner,
          repo: repoBackName,
          per_page: 1,
        })
      : { data: [null] };

    const [
      {
        data: [repoFront],
      },
      {
        data: [repoBack],
      },
      {
        data: [pullRequestsFront],
      },
      {
        data: [pullRequestsBack],
      },
    ] = await Promise.all([
      lastCommitFrontPromise,
      lastCommitBackPromise,
      lastPullRequestFrontPromise,
      lastPullRequestBackPromise,
    ]);

    if (repo.front) {
      setInfoRepoFront({ commits: repoFront, pullRequests: pullRequestsFront });
    }
    if (repo.back) {
      setInfoRepoBack({ commits: repoBack, pullRequests: pullRequestsBack });
    }
  }, [
    repo.back,
    repo.front,
    repoBackName,
    repoBackOwner,
    repoFrontName,
    repoFrontOwner,
  ]);

  const getValidation = useCallback(async () => {
    interface Data {
      messages: any[];
    }

    const {
      data: { messages },
    } = await axios.get<Data>(
      `https://validator.w3.org/nu/?doc=${prod.front}&out=json`
    );
    const errors = messages.filter((message) => message.type === "error");
    const warnings = messages.filter((message) => message.type === "info");
    if (errors.length > 0) {
      setValidation("errors");
    } else if (warnings.length > 0) {
      setValidation("warnings");
    } else {
      setValidation("ok");
    }
  }, [prod.front]);

  useEffect(() => {
    getInfoRepo();
    getValidation();
  }, [getInfoRepo, getValidation]);

  return (
    <StyledArticle backgroundColor={backgroundColor}>
      <StyledStudent>{student}</StyledStudent>
      <StyledTitle>{name} </StyledTitle>
      {repo?.front && (
        <>
          <StyledSide>
            Front{" "}
            <a href={prod.front} target="_blank" rel="noreferrer">
              <UrlIcon />
            </a>{" "}
            <a href={repo.front} target="_blank" rel="noreferrer">
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
          <p>
            HTML validation:{" "}
            <a
              href={`https://validator.w3.org/nu/?doc=${prod.front}`}
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
      {trello && (
        <StyledLogo>
          <a href={trello} target="_blank" rel="noreferrer">
            <img src={trelloLogo} alt="Trello" height="20" />
          </a>
        </StyledLogo>
      )}
      {tutor && <StyledTutor>{tutor.name.charAt(0).toUpperCase()}</StyledTutor>}
      {showFrontProdPreview && <ProdPreview url={prod.front} />}
    </StyledArticle>
  );
};

export default ProjectCard;
