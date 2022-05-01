import styled from "styled-components";

const StyledLoading = styled.svg`
  width: 20px;
  animation: rotate 3.6s linear infinite;

  circle {
    fill: none;
    stroke: currentColor;
    stroke-width: 8px;
    stroke-dasharray: 300;
    animation: outline 2s cubic-bezier(0.77, 0, 0.18, 1) infinite;
  }

  @keyframes outline {
    0% {
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dashoffset: 300;
    }
    100% {
      stroke-dashoffset: 600;
    }
  }

  @keyframes rotate {
    from {
      transform: rotate(0turn);
    }
    to {
      transform: rotate(-1turn);
    }
  }
`;

const Loading = (): JSX.Element => {
  return (
    <StyledLoading viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="46" />
    </StyledLoading>
  );
};

export default Loading;
