import { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Filters from "../../components/Filters/Filters";
import ProjectsList from "../../components/ProjectsList/ProjectsList";
import Toolbar from "../../components/Toolbar/Toolbar";
import TutorsNavigation from "../../components/TutorsNavigation/TutorsNavigation";
import { RootState } from "../../redux/reducers";
import { ProjectsState } from "../../redux/reducers/projectsReducer";
import {
  loadProjectsFilteredThunk,
  loadProjectsThunk,
} from "../../redux/thunks/projectsThunks";
import { loadTutorsThunk } from "../../redux/thunks/tutorsThunks";

const StyledBar = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ProjectsListPage = (): JSX.Element => {
  const { challengeId } = useParams();
  const dispatch = useDispatch();
  const {
    list: projects,
    filterByTutor,
    filterByCoverage,
  }: ProjectsState = useSelector((state: RootState) => state.projects);

  const timer = useRef<number>();

  const loadProjects = useCallback(() => {
    if (filterByTutor) {
      dispatch(
        loadProjectsFilteredThunk(
          challengeId as string,
          filterByTutor,
          filterByCoverage
        )
      );
    } else {
      dispatch(loadProjectsThunk(challengeId as string, filterByCoverage));
    }
  }, [challengeId, dispatch, filterByTutor, filterByCoverage]);

  useEffect(() => {
    dispatch(loadTutorsThunk());
  }, [dispatch]);

  useEffect(() => {
    loadProjects();
    timer.current = window.setInterval(
      () => loadProjects(),
      +(process.env.REACT_APP_RELOAD_TIME as string)
    );
    return () => clearInterval(timer.current);
  }, [challengeId, dispatch, loadProjects]);

  return (
    <>
      <StyledBar>
        <TutorsNavigation />
        <Filters />
        <Toolbar ids={projects.map((project) => project.id)} />
      </StyledBar>
      <ProjectsList projects={projects} />
    </>
  );
};

export default ProjectsListPage;
