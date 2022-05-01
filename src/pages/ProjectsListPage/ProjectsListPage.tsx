import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import ProjectsList from "../../components/ProjectsList/ProjectsList";
import TutorsNavigation from "../../components/TutorsNavigation/TutorsNavigation";
import { RootState } from "../../redux/reducers";
import { ProjectsState } from "../../redux/reducers/projectsReducer";
import { loadProjectsThunk } from "../../redux/thunks/projectsThunks";
import Project from "../../types/project";

const StyledBar = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ProjectsListPage = (): JSX.Element => {
  const { challengeId } = useParams();

  const dispatch = useDispatch();
  const { list: projectsList, filterBy }: ProjectsState = useSelector(
    (state: RootState) => state.projects
  );
  const timer = useRef<number>();

  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    setProjects(
      filterBy
        ? projectsList.filter((project) => project.tutor.name === filterBy)
        : projectsList
    );
  }, [filterBy, projectsList]);

  useEffect(() => {
    dispatch(loadProjectsThunk(challengeId as string));
    timer.current = window.setInterval(
      () => dispatch(loadProjectsThunk(challengeId as string)),
      +(process.env.REACT_APP_RELOAD_TIME as string)
    );
    return () => clearInterval(timer.current);
  }, [challengeId, dispatch]);

  return (
    <>
      <StyledBar>
        <TutorsNavigation />
      </StyledBar>
      <ProjectsList projects={projects} />
    </>
  );
};

export default ProjectsListPage;
