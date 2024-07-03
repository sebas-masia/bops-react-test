import styled from 'styled-components';
import { baseTheme } from '@Themes';

export const Container = styled.div`
  position: fixed;
  top: 30px;
  right: 30px;
  width: 300px;
  z-index: 2001;
`;

export const IconContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const Button = styled.div`
  cursor: pointer;
  color: ${({ active }: { active?: boolean }) => (active ? baseTheme.colors.bopsPurple : baseTheme.colors.fontGrey)};
  border-color: ${({ active }: { active?: boolean }) =>
    active ? baseTheme.colors.bopsPurple : baseTheme.colors.fontGrey};
  background-color: ${(props) => props.theme.colors.cardBackground2};
  border: 2px solid;
  border-radius: 100%;
  height: 25px;
  width: 25px;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 10px ${(props) => props.theme.colors.shadow};
  transition-duration: 0.5s;

  &:hover {
    color: ${({ active }: { active?: boolean }) =>
    active ? baseTheme.colors.bopsPurpleHover : baseTheme.colors.cardBackground5};
    border-color: ${({ active }: { active?: boolean }) =>
    active ? baseTheme.colors.bopsPurpleHover : baseTheme.colors.cardBackground5};
  }

  &:active {
    color: ${(props) => props.theme.colors.bopsPurpleActive};
    border-color: ${(props) => props.theme.colors.bopsPurpleActive};
  }
`;

export const DropdownContainer = styled.div`
  margin-top: 10px;
  border-radius: 5px;
  background-color: ${(props) => props.theme.colors.cardBackground};
  border: 1px solid ${(props) => props.theme.colors.cardBorder2};
  box-shadow: 0 0 25px #1a1a1a;
`;

export const LauncherTitle = styled.div`
  margin: 10px;
  color: ${(props) => props.theme.colors.fontGrey};
  font-weight: 700;
`;

export const DetailsButton = styled.div`
  margin: 10px;
  color: ${(props) => props.theme.colors.bopsPurple};
  font-size: 14px;
  font-weight: 400;
  cursor: pointer;
  transition-duration: 0.2s;

  &:hover {
    font-weight: 600;
    border-bottom: 1px solid ${(props) => props.theme.colors.bopsPurple};
  }
`;

export const ListContainer = styled.div``;

export const TopContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const List = styled.ul`
  list-style-type: none;
  background-color: ${(props) => props.theme.colors.cardBackground2};
  overflow: scroll;
  margin: 0;
  padding: 0;
  max-height: 300px;
`;

export const ListItem = styled.li`
  cursor: pointer;
  color: ${(props) => props.theme.colors.fontGrey};
  font-weight: 400;
  padding: 10px;
  font-size: 14px;
`;

export const OpenIndicator = styled.div`
  background-color: ${(props) => props.theme.colors.bopsPurple};
  width: 10px;
  height: 10px;
  border-radius: 100%;
  margin: 10px;
`;

export const OpenItem = styled.div`
  background-color: ${(props) => props.theme.colors.cardBackground3};
`;

export const ItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: solid 1px ${(props) => props.theme.colors.transparentLightGrey};

  &:hover {
    background-color: ${(props) => props.theme.colors.transparentBlack};
  }
`;
