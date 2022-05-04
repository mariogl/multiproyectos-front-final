import { ButtonGroup } from "react-bootstrap";
import styled from "styled-components";

const StyledButtonGroup = styled(ButtonGroup)`
  margin-bottom: 20px;
  button {
    background-color: #444;
    border-color: #444;
    &.active {
      background-color: #111;
      border-color: #111;
      font-weight: bold;
    }
  }
`;

export default StyledButtonGroup;
