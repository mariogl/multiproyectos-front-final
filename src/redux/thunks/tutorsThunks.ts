import axios from "axios";
import { Dispatch } from "react";
import { LoadTutorsAction } from "../../types/actions";
import Tutor from "../../types/tutor";
import { loadTutorsAction } from "../actions/tutorsActionCreators";

export const loadTutorsThunk =
  () => async (dispatch: Dispatch<LoadTutorsAction>) => {
    const apiUrl = `${process.env.REACT_APP_API_URL}users`;
    const { data: tutors } = await axios.get<Tutor[]>(apiUrl, {
      headers: {
        authorization: `Bearer ${process.env.REACT_APP_TEMP_JWT}`,
      },
    });
    dispatch(
      loadTutorsAction(tutors.filter((tutor) => tutor.name !== "Mario"))
    );
  };
