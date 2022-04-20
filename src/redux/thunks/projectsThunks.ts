import axios from "axios";
import { Dispatch } from "react";
import { LoadProjectsAction } from "../../types/actions";
import Project from "../../types/project";
import loadProjectsAction from "../actions/projectsActionCreators";

export const loadProjectsThunk =
  (challengeId: string) => async (dispatch: Dispatch<LoadProjectsAction>) => {
    const apiUrl = `${process.env.REACT_APP_API_URL}projects/${challengeId}`;
    const { data } = await axios.get<{ projects: Project[] }>(apiUrl, {
      headers: {
        authorization: `Bearer ${process.env.REACT_APP_TEMP_JWT}`,
      },
    });

    dispatch(loadProjectsAction(data.projects));
  };
