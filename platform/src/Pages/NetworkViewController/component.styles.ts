import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  position: relative;
`;

export const SelectRow = styled.div`
  position: fixed;
  top: 30px;
  left: 535px;
  z-index: 1009;
  display: inline-flex;
`;

export const Sidebar = styled.div`
  box-shadow: 0 0 10px rgb(24, 29, 39) 10%;
`;

export const Main = styled.main`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

export const ProcessGroupContainer = styled.div`
  position: fixed;
  bottom: 100px;
  right: 10px;
`;
