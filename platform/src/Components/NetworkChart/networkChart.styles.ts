import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100vh;
`;

export const TooltipStyled = styled.div<{ x: number; y: number }>`
  left: ${(props) => `${props.x})`};
  top: ${(props) => `${props.y})`};
`;

export const TooltipArrow = styled.div.attrs(() => ({
  className: 'tooltip-arrow',
}))``;

export const TooltipContent = styled.div.attrs(() => ({
  className: 'tooltip-content',
}))``;
