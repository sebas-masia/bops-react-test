import styled from 'styled-components';

export const Container = styled.div`
  margin: 20px 0px;
  width: 100%;
  display: inline-flex;
  justify-content: space-around;
`;

export const Data = styled.div`
  width: 35%;
  background-color: #1d1d1d;
  padding: 4px 10px 4px 20px;
  border-radius: 10px;
  border: 1px #adadad solid;
  box-shadow: 0 0 15px #333333;
`;

export const CalculatedData = styled(Data)`
  border: 1px $main-color solid;
`;

export const Title = styled.p`
  font-weight: bold;
  margin-bottom: 5px;
`;

export const Value = styled.p`
  margin: 10px 0px;
  font-size: 18px;
`;

export const ValueNumber = styled.span`
  font-size: 36px;
  font-weight: bold;
`;

export const ValueNumberCalculated = styled(ValueNumber)`
  font-size: 36px;
  font-weight: bold;
  color: #7b6af6;
`;
