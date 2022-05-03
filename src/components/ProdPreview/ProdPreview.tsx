import styled from "styled-components";

const StyledIframe = styled.div`
  height: 255px;
  iframe {
    padding: 10px;
    background-color: #fff;
    border-radius: 15px;
    transform: scale(0.5);
    transform-origin: top left;
    width: 200%;
    height: 500px;
  }
`;

interface ProdPreviewProps {
  url: string;
}

const ProdPreview = ({ url }: ProdPreviewProps): JSX.Element => {
  return (
    <StyledIframe>
      <iframe src={url} title="preview" />
    </StyledIframe>
  );
};

export default ProdPreview;
