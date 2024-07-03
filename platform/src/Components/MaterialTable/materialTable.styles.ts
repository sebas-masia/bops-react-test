import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: inline-flex;
  flex-direction: column;
  margin: 2vh 0px;
`;

export const TableContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
`;

export const Title = styled.h1`
  color: ${(props) => props.theme.colors.fontGrey};
  font-size: 36px;
`;

export const TitleContainer = styled.div`
  display: flex;
`;

export const Table = styled.table`
  border-collapse: collapse;
`;
