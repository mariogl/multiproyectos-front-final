import axios from "axios";
import { Dispatch } from "react";
import { LoadChallengesAction } from "../../types/actions";
import Challenge from "../../types/challenges";
import loadChallengesAction from "../actions/challengesActionCreators";

export const loadChallengesThunk =
  () => async (dispatch: Dispatch<LoadChallengesAction>) => {
    const apiUrl = `${process.env.REACT_APP_API_URL}challenges`;
    const { data } = await axios.get<{ challenges: Challenge[] }>(apiUrl, {
      headers: {
        authorization: `Bearer ${process.env.REACT_APP_TEMP_JWT}`,
      },
    });
    dispatch(loadChallengesAction(data.challenges));
  };
