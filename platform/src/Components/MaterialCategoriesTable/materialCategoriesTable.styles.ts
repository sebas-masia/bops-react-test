import styled from 'styled-components';
import { TableCard, Container as TableContainer } from '../Table/table.styles';

export const Container = styled.div`
  display: flex;
  justify-content: left;
  color: white;
  margin: 0px;

  ${TableContainer} {
    width: auto;
    max-width: 800px;
  }

  ${TableCard} {
    height: 100%;
    width: 100%;
  }
`;

export const KpiCell = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 15px 10px;
`;

export const Kpi = styled.div`
  width: 50px;
  height: 30px;
  line-height: 30px;
  text-align: center;

  border-bottom: 4px solid #00000000;
  font-size: 18px;

  &:hover {
    font-weight: 700;
    border-bottom: 2px solid ${(props) => props.theme.colors.bopsPurple};
  }
`;

export const SelectedKpi = styled.div`
  color: ${(props) => props.theme.colors.bopsPurple} !important;
  font-weight: 700 !important;
`;
