import styled from "styled-components";

const StyledIframe = styled.iframe`
  padding: 10px;
  background-color: #fff;
  border-radius: 15px;
  width: 100%;
`;

interface ProdPreviewProps {
  url: string;
}

const ProdPreview = ({ url }: ProdPreviewProps): JSX.Element => {
  return <StyledIframe src={url} title="preview" />;
};

export default ProdPreview;
