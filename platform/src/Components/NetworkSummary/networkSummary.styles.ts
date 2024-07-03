import styled from 'styled-components';

export const Title = styled.div`
  margin-bottom: 5px;
  font-size: 22px;
  font-weight: bold;
  color: rgb(121, 126, 139);
`;

export const Value = styled.div`
  font-size: 40px;
  margin-bottom: 10px;
`;

const SummaryCard = styled.div`
  background-color: ${(props) => props.theme.colors.black};
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  align-content: center;
  justify-content: center;
  text-align: center;
  width: 150px;
  height: 150px;
  padding: 25px;
  box-shadow: 0 0 10px #8897b6;
`;

export const InventoryCard = styled(SummaryCard)`
  border-radius: 50px;
  border: solid 1px ${(props) => props.theme.colors.bopsPurple};
`;

export const ProcessGroupCard = styled(SummaryCard)`
  margin-left: 35px;
  border-radius: 100%;
  border: solid 1px rgb(84, 110, 122);
`;

export const CodeActivationWrapper = styled.div`
  margin-bottom: 0rem;


  [class*='Wrapper'] {
    width: 100%;
    margin-bottom: 0rem;
  }

  [class*='FormFieldStyled'] {
    margin-bottom: 0rem;
 `;

export const GroupBlock = styled.div`
  display: flex;
  flex-direction: row;
  margin: 10px 0px;
  padding: 40px 0px;
`;

export const InventoryBlock = styled.div`
  margin: 10px;
  padding: 40px 60px 30px 0px;
  border-right: solid 1px ${(props) => props.theme.colors.transparentLightGrey};
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 120px;
  color: white;
`;
