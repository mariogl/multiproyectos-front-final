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
      fill: inherit;
    }
    &.warnings {
      fill: orange;
    }
    &.errors {
      fill: red;
    }
    &.subicon {
      position: relative;
      left: -10px;
      top: 10px;
      width: 15px;
      height: auto;
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

export const StyledSides = styled.div<{
  compactMode?: boolean;
}>`
  display: flex;
  flex-direction: ${(props) => (props.compactMode ? "column" : "row")};
  justify-content: space-between;
  margin-top: 20px;
`;

export const StyledSide = styled.div<{
  compactMode?: boolean;
}>`
  padding: 10px;
  border-radius: 10px;
  border: 2px solid #0002;
`;

export const StyledDataPills = styled.div<{
  compactMode?: boolean;
}>`
  display: flex;
  justify-content: space-between;
`;

export const StyledDataPill = styled.div<{
  compactMode?: boolean;
}>`
  width: ${(props) => (props.compactMode ? "100%" : "49%")};
  padding: 10px;
  background-color: #0002;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
`;

export const StyledSingleData = styled.div<{
  size?: string;
}>`
  text-align: center;
  padding: 10px;
  ${(props) =>
    props.size === "big" ? "width: 100%; font-size: 18px;" : "flex: 1;"}
  background-color: #0002;
  border-radius: 10px;
  .single-data {
    font-size: 32px;
    font-weight: bold;
    display: block;
  }
`;

export const StyledSideHeader = styled.header`
  display: flex;
  justify-content: space-between;
`;

export const StyledSideIcons = styled.div``;

export const StyledSideHeading = styled.h4`
  font-size: 1.4em;
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
