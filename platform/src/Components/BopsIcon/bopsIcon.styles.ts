import styled from 'styled-components';

export const Image = styled.img`
  :hover {
    opacity: 0.7;
  }
`;

export const BopsCardContainer = styled.div`
  background-color: ${(props) => props.theme.colors.black};
  position: fixed;
  z-index: 1009;
  top: 20px;
  right: 20px;
  width: 52px;
  height: 52px;
  border-radius: 26px;
  box-shadow: 0 0 20px ${(props) => props.theme.colors.bopsPurple};
  display: flex;
  align-items: center;
  justify-content: center;
`;
