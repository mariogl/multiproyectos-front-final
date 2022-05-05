import axios from "axios";
import { randomProjects } from "../../factories/project";
import Project from "../../types/project";
import { loadProjectsThunk } from "./projectsThunks";

jest.mock("axios");

describe("Given a loadProjectsThunk function", () => {
  describe("When it's invoked", () => {
    test("Then it should invoke dispatch with a load projects action with a list of projects", async () => {
      const dispatch = jest.fn();
      const projects: Project[] = randomProjects();

      axios.get = jest.fn().mockResolvedValue({ data: { projects } });

      const actualThunk = loadProjectsThunk("", "");
      await actualThunk(dispatch);

      expect(dispatch).toHaveBeenCalled();
    });
  });
});
