import { rest } from "msw";
import { randomChallenges } from "../factories/challenge";
import { randomProjects } from "../factories/project";

export const handlers = [
  rest.get(`${process.env.REACT_APP_API_URL}challenges`, (req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json({
        projects: randomChallenges(3),
      })
    )
  ),
  rest.get(
    `${process.env.REACT_APP_API_URL}projects/:projectId`,
    (req, res, ctx) =>
      res(
        ctx.status(200),
        ctx.json({
          projects: randomProjects(3),
        })
      )
  ),
  rest.get("https://validator.w3.org/nu/", (req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json({
        url: "",
        messages: [],
      })
    )
  ),
  rest.get("https://api.github.com/repos/*", (req, res, ctx) =>
    res(ctx.status(200))
  ),
];
