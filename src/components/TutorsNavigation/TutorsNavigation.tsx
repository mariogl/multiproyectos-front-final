import React from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { filterProjectsByTutorAction } from "../../redux/actions/projectsActionCreators";
import { RootState } from "../../redux/reducers";
import StyledButtonGroup from "../StyledButtonGroup/StyledButtonGroup";

const TutorsNavigation = (): JSX.Element => {
  const dispatch = useDispatch();
  const currentFilter = useSelector(
    (state: RootState) => state.projects.filterByTutor
  );
  const tutors = useSelector((state: RootState) => state.tutors);

  const filter = (id: string, event: React.MouseEvent) => {
    event.preventDefault();
    dispatch(filterProjectsByTutorAction(id));
  };

  return (
    <nav>
      <StyledButtonGroup size="sm">
        {tutors.map(({ id, name }) => (
          <Button
            key={id}
            onClick={(event) => filter(id, event)}
            active={currentFilter === name}
          >
            {name}
          </Button>
        ))}
        <Button
          onClick={(event) => filter("", event)}
          active={currentFilter === ""}
        >
          Todos
        </Button>
      </StyledButtonGroup>
    </nav>
  );
};

export default TutorsNavigation;
