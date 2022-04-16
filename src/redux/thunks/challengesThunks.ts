import axios from "axios";
import { Dispatch } from "react";
import { LoadChallengesAction } from "../../types/actions";
import Challenge from "../../types/challenges";
import loadChallengesAction from "../actions/challengesActionCreators";

export const loadChallengesThunk =
  () => async (dispatch: Dispatch<LoadChallengesAction>) => {
    const apiUrl = process.env.REACT_APP_API_URL as string;
    const { data } = await axios.get<Challenge[]>(apiUrl);

    dispatch(loadChallengesAction(data));
  };
