import styled from 'styled-components';

export const Container = styled.div`
  background-color: ${(props) => props.theme.colors.cardBackground};
  border: 1px solid ${(props) => props.theme.colors.cardBorder};
  border-radius: 40px;
  width: auto;
  height: auto;
  z-index: 2000;
  padding: 5px 10px;
  color: ${(props) => props.theme.colors.nightBlue};
  box-shadow: 0 0 10px ${(props) => props.theme.colors.shadow};

  position: fixed;
  left: 20px;
  top: 20px;

  img {
    height: 40px;
    width: auto;
    margin-right: 5px;
  }
`;

export const InternalCard = styled.div`
  display: inline-flex;
  align-items: center;
`;
