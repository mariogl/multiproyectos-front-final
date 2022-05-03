import { useCallback, useState } from "react";
import { Octokit } from "@octokit/rest";

const octokit = new Octokit({ auth: process.env.REACT_APP_GITHUB_TOKEN });

const useGitHub = (repo: { front: string; back: string }) => {
  const [infoRepoFront, setInfoRepoFront] = useState<any>(null);
  const [infoRepoBack, setInfoRepoBack] = useState<any>(null);

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

  return {
    infoRepoFront,
    infoRepoBack,
    getInfoRepo,
  };
};

export default useGitHub;
