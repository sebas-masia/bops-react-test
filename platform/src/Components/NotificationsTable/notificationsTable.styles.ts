import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin: 50px 0px;
`;

export const Title = styled.h1`
  color: ${(props) => props.theme.colors.fontGrey};
  font-size: 40px;
  margin-left: 40px;
`;

export const Cell = styled.div`
  margin: 0px 20px;
`;

export const IconDiv = styled(Cell)`
  cursor: pointer;
`;

export const CompletedIconDiv = styled.div`
  color: ${(props) => props.theme.colors.bopsPurple};
`;

export const TableContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
`;

export const TableBox = styled.div`
  width: 85%;
`;
