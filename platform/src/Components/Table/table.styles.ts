import { baseTheme } from '@Themes';
import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

export const TableContainer = styled.div``;

export const TableCard = styled.div`
  border: 1px solid ${(props) => props.theme.colors.cardBorder};
  border-radius: 10px;
  width: auto;
  height: auto;
  z-index: 1000;
  box-shadow: 0 0 10px ${(props) => props.theme.colors.shadow};
`;

export const TableBase = styled.table`
  border-collapse: collapse;
`;

export const THead = styled.thead``;

export const TBody = styled.tbody``;

export const HeaderRow = styled.tr``;

export const BodyRow = styled.tr<{ depth: number }>`
  background: ${(props) => `rgba(24, 29, 39, ${props.depth * 0.75})`};

  &:not(:last-child) {
    border-bottom: solid 1px ${(props) => props.theme.colors.transparentLightGrey};
  }

  &:last-child {
    border-radius: 20px;
  }
  &:hover {
    background-color: ${(props) => props.theme.colors.bopsPurpleTransparent} !important;
  }
`;

export const TD = styled.td`
  color: ${(props) => props.theme.colors.fontGrey};
  font-weight: 500;
  text-align: center;
  font-size: 16px;
  overflow-wrap: break-word;
  cursor: pointer;
  padding: 15px 20px !important;
`;

export const TH = styled.th`
  background-color: ${(props) => props.theme.colors.cardBackgroundTransparent};
  padding: 15px 20px;
  min-width: 120px;
  color: ${(props) => props.theme.colors.fontGrey};
  font-weight: bold;
  font-size: 18px;
  border-bottom: solid 1px ${(props) => props.theme.colors.transparentLightGrey};

  &:not(:first-child):hover {
    cursor: pointer;
    background-color: ${(props) => props.theme.colors.cardBorderTransparent} !important;
  }
`;

export const Sorted = styled.span``;

export const Button = styled.div`
  cursor: pointer;
  display: flex;
  height: 10px;
  width: 25px;
  transition-duration: 0.5s;

  color: ${({ active }: { active?: boolean }) => (active ? baseTheme.colors.bopsPurple : baseTheme.colors.fontGrey)};
  font-weight: ${({ active }: { active?: boolean }) => (active ? '800' : '400')};

  &:hover {
    font-weight: 800;
  }
`;

export const TableTools = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 5px;
`;

export const Pagination = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 1vh 10px;
  align-items: left;
  justify-content: left;
`;

export const PaginationIcon = styled.div<{ active: boolean }>`
  color: ${({ active, theme }: { active?: boolean; theme: any }) =>
    active ? theme.colors.fontGrey : theme.colors.cardBorder2};

  &:hover {
    color: ${(props) => props.theme.colors.cardBorder2};
    border: 1px solid transparent;
  }
`;
