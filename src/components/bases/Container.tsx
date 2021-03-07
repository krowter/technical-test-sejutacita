import styled from "styled-components";

interface ContainerProps {
  background?: string;
}

export const Container = styled.div<ContainerProps>`
  @media (min-width: 1280px) {
    max-width: 1140px;
  }
  @media (min-width: 968px) {
    max-width: 768px;
  }

  margin-left: auto;
  margin-right: auto;

  background: ${({ theme, background }) =>
    background ? theme.color[background] : "initial"};
`;
