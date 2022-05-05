import { SyntheticEvent } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { filterProjectsByCoverageAction } from "../../redux/actions/projectsActionCreators";
import { RootState } from "../../redux/reducers";
import StyledButtonGroup from "../StyledButtonGroup/StyledButtonGroup";

const Filters = (): JSX.Element => {
  const currentCoverageFilter = useSelector(
    (state: RootState) => state.projects.filterByCoverage
  );
  const dispatch = useDispatch();

  const setFilterCoverage = (event: SyntheticEvent, type: string) => {
    event.preventDefault();
    dispatch(
      filterProjectsByCoverageAction(type === currentCoverageFilter ? "" : type)
    );
  };

  return (
    <div className="filters">
      <StyledButtonGroup size="sm">
        <Button
          onClick={(event) => setFilterCoverage(event, "low")}
          active={currentCoverageFilter === "low"}
        >
          Low coverage
        </Button>
      </StyledButtonGroup>
      <StyledButtonGroup size="sm">
        <Button
          onClick={(event) => setFilterCoverage(event, "high")}
          active={currentCoverageFilter === "high"}
        >
          High coverage
        </Button>
      </StyledButtonGroup>
    </div>
  );
};

export default Filters;
