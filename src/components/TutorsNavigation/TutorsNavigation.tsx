import React from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { filterProjectsAction } from "../../redux/actions/projectsActionCreators";
import { RootState } from "../../redux/reducers";
import StyledButtonGroup from "../StyledButtonGroup/StyledButtonGroup";

const TutorsNavigation = (): JSX.Element => {
  const dispatch = useDispatch();
  const actualFilter = useSelector(
    (state: RootState) => state.projects.filterBy
  );
  const tutors = useSelector((state: RootState) => state.tutors);

  const filter = (id: string, event: React.MouseEvent) => {
    event.preventDefault();
    dispatch(filterProjectsAction(id));
  };

  return (
    <nav>
      <StyledButtonGroup size="sm">
        {tutors.map(({ id, name }) => (
          <Button
            key={id}
            onClick={(event) => filter(id, event)}
            active={actualFilter === name}
          >
            {name}
          </Button>
        ))}
        <Button
          onClick={(event) => filter("", event)}
          active={actualFilter === ""}
        >
          Todos
        </Button>
      </StyledButtonGroup>
    </nav>
  );
};

export default TutorsNavigation;
