import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../redux/reducers";
import { loadChallengesThunk } from "../../redux/thunks/challengesThunks";
import Challenge from "../../types/challenges";

const ChallengesList = (): JSX.Element => {
  const dispatch = useDispatch();
  const challenges: Challenge[] = useSelector(
    (state: RootState) => state.challenges
  );

  useEffect(() => {
    dispatch(loadChallengesThunk());
  }, [dispatch]);

  return (
    <ul>
      {challenges.map((challenge: Challenge) => (
        <li key={challenge.id}>
          <Link to={`/projects/by-challenge/${challenge.id}`}>
            {challenge.name.toUpperCase()}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default ChallengesList;
