import styled from "styled-components";

export const StyledArticle = styled.article<{
  backgroundColor: { color: string; theme: string };
}>`
  background-color: ${(props) => props.backgroundColor.color};
  color: ${(props) =>
    props.backgroundColor.theme === "dark" ? "#fff" : "#000"};
  padding: 10px;
  font-size: 12px;
  position: relative;
  .coverage {
    display: inline-block;
  }
  .danger {
    background-color: red;
  }
  .good {
    background-color: green;
  }
  a {
    color: inherit;
    text-decoration: inherit;
  }
  svg {
    fill: ${(props) =>
      props.backgroundColor.theme === "dark" ? "#fff" : "#000"};
    height: 20px;
    width: auto;
    path {
      fill: ${(props) =>
        props.backgroundColor.theme === "dark"
          ? "#fff !important"
          : "#000 !important"};
    }
  }
  .validation-errors {
    color: red;
    font-weight: bold;
  }
  .validation-warnings {
    color: yellow;
    font-weight: bold;
  }
`;

export const StyledStudent = styled.span`
  font-size: 1.1em;
`;

export const StyledTitle = styled.h3`
  font-size: 1.5em;
  a {
    color: inherit;
    margin-left: 10px;
  }
`;

export const StyledSides = styled.div`
  display: flex;
  margin-top: 20px;
`;

export const StyledSide = styled.div`
  flex: 1;
`;

export const StyledSideHeading = styled.h4`
  font-size: 1.2em;
`;

export const StyledTutor = styled.span<{
  backgroundColor: { color: string; theme: string };
}>`
  position: absolute;
  right: 10px;
  top: 10px;
  border: 1px solid
    ${(props) => (props.backgroundColor.theme === "dark" ? "#fff" : "#000")};
  border-radius: 50%;
  display: inline-block;
  width: 20px;
  text-align: center;
`;

export const StyledLogo = styled.span`
  position: absolute;
  right: 40px;
  top: 10px;
`;
