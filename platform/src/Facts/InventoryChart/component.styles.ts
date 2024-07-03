import styled from 'styled-components';
import Chart from 'react-apexcharts';

export const Container = styled.div`
  position: absolute;
  top: 54px;
  left: 50%;
  width: 50%;
`;

export const Title = styled.h3`
  padding-left: 45px;
  margin-bottom: 2px;
`;

export const StyledChart = styled(Chart).attrs(() => ({
  className: 'donut',
}))``;
