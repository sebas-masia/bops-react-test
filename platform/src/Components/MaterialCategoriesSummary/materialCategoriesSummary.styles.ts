import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 70px;
`;

export const Title = styled.h1`
  margin-bottom: 1.5vh;
  font-weight: bold;
  color: ${(props) => props.theme.colors.fontGrey};
  font-size: 36px;
`;

export const TopContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const TitleContainer = styled.div`
  width: 50%;
`;

export const SelectContainer = styled.div`
  width: 50%;
  display: flex;
  justify-content: flex-end;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  margin-top: 10px;

  > div:first-child {
    width: 40%;
    // background: red;
  }

  > div:last-child {
    width: 60%;
    // background: blue;
  }
`;

export const LoadingDiv = styled.div`
  margin-top: 15vh;

  div {
    margin: auto;
  }
`;
