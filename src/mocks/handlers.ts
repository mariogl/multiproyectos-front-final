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
];
