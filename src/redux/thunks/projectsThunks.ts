import axios from "axios";
import { Dispatch } from "react";
import { DeleteProjectAction, LoadProjectsAction } from "../../types/actions";
import Project from "../../types/project";
import {
  loadProjectsAction,
  deleteProjectAction,
} from "../actions/projectsActionCreators";

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

export const deleteProjectThunk =
  (id: string) => async (dispatch: Dispatch<DeleteProjectAction>) => {
    return new Promise<void>(async (resolve, reject) => {
      const apiUrl = `${process.env.REACT_APP_API_URL}projects/${id}`;
      const { status } = await axios.delete(apiUrl, {
        headers: {
          authorization: `Bearer ${process.env.REACT_APP_TEMPORARY_JWT}`,
        },
      });
      if (status === 200) {
        dispatch(deleteProjectAction(id));
        resolve();
      }
    });
  };
