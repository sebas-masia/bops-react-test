import styled from 'styled-components';
import { baseTheme } from '@Themes';

/* eslint import/prefer-default-export: "off" */

export const Container = styled.div<{ isActive: boolean }>`
  height: 41px;
  width: 41px;
  cursor: pointer;
  color: white;
  transition-duration: 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  margin-right: 4px;

  color: ${({ isActive }) => `${isActive ? baseTheme.colors.bopsPurple : baseTheme.colors.white}`};

  :hover {
    color: ${({ isActive }) =>
      `${isActive ? baseTheme.colors.bopsPurpleActive : baseTheme.colors.transparentLightGrey}`};
  }
`;
