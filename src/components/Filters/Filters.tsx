import { Button } from "react-bootstrap";
import StyledButtonGroup from "../StyledButtonGroup/StyledButtonGroup";

const Filters = (): JSX.Element => {
  return (
    <div className="filters">
      <StyledButtonGroup size="sm">
        <Button onClick={() => {}} active={true}>
          Low coverage
        </Button>
      </StyledButtonGroup>
    </div>
  );
};

export default Filters;
