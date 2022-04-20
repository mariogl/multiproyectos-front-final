import { screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { BrowserRouter } from "react-router-dom";
import { randomProject } from "../../factories/project";
import customRender from "../../testUtils";
import ProjectCard from "./ProjectCard";

describe("Given a ProjectCard component", () => {
  describe("When it receives a project", () => {
    test("Then it should display its name and student", async () => {
      const project = randomProject();

      customRender(
        <BrowserRouter>
          <ProjectCard
            project={project}
            backgroundColor={{ color: "#000", theme: "dark" }}
          />
        </BrowserRouter>
      );

      const name = await screen.findByRole("heading", {
        name: project.name,
      });

      expect(name).toBeInTheDocument();

      await act(() => Promise.resolve());
    });
  });
});
