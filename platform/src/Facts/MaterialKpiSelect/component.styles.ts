import styled from 'styled-components';
import Select from 'react-select';

export const Container = styled.div`
  margin-top: 25px;
  padding-top: 35px;
  padding-bottom: 35px;
  border-top: solid 1px rgba(173, 173, 173, 0.2);
  border-bottom: solid 1px rgba(173, 173, 173, 0.2);
`;

export const SelectContainer = styled.div`
  display: flex;
  margin-left: 15px;
`;

export const StyledSelectContainer = styled(Select)`
  width: 200px;
  margin: 0px 50px 30px 25px;
`;

export const TitleRow = styled.div`
  display: flex;
  justify-content: space-around;
`;

export const TitleValue = styled.h3`
  font-weight: bold;
  margin-bottom: 0px;
`;

export const UL = styled.ul``;

export const LI = styled.li``;
