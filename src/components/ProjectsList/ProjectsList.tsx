import { Col, Row } from "react-bootstrap";
import Project from "../../types/project";
import ProjectCard from "../ProjectCard/ProjectCard";

const colors = [
  { color: "#d50158", theme: "dark" },
  { color: "#8900a6", theme: "dark" },
  { color: "#3330a3", theme: "dark" },
  { color: "#0084d6", theme: "dark" },
  { color: "#009baa", theme: "dark" },
  { color: "#007e6b", theme: "dark" },
  { color: "#009534", theme: "dark" },
  { color: "#abb901", theme: "light" },
  { color: "#ffc100", theme: "light" },
  { color: "#ff7101", theme: "light" },
  { color: "#f92801", theme: "dark" },
  { color: "#d50158", theme: "dark" },
  { color: "#8900a6", theme: "dark" },
  { color: "#3330a3", theme: "dark" },
  { color: "#0084d6", theme: "dark" },
  { color: "#009baa", theme: "dark" },
  { color: "#007e6b", theme: "dark" },
  { color: "#009534", theme: "dark" },
  { color: "#abb901", theme: "light" },
  { color: "#ffc100", theme: "light" },
  { color: "#ff7101", theme: "light" },
  { color: "#f92801", theme: "dark" },
  { color: "#d50158", theme: "dark" },
  { color: "#8900a6", theme: "dark" },
  { color: "#3330a3", theme: "dark" },
  { color: "#0084d6", theme: "dark" },
  { color: "#009baa", theme: "dark" },
  { color: "#007e6b", theme: "dark" },
  { color: "#009534", theme: "dark" },
  { color: "#abb901", theme: "light" },
  { color: "#ffc100", theme: "light" },
  { color: "#ff7101", theme: "light" },
  { color: "#f92801", theme: "dark" },
];

interface ProjectsListProps {
  projects: Project[];
}

const ProjectsList = ({ projects }: ProjectsListProps): JSX.Element => {
  return (
    <>
      <p>{projects.length} proyectos</p>
      <Row as="ul" className="projects-list list-unstyled">
        {projects.map((project: Project, i: number) => (
          <Col
            as="li"
            xs={12}
            sm={6}
            md={4}
            lg={3}
            key={project.id}
            className="container-card"
          >
            <ProjectCard project={project} backgroundColor={colors[i]} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default ProjectsList;
