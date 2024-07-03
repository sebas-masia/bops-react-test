import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${(props) => props.theme.colors.white};
`;

export const Image = styled.img`
  margin-top: 15vh;
  margin-left: 20px;
  width: 175px;
`;

export const ImageContainer = styled.div`
  width: 350px;
`;

export const Card = styled.div`
  margin: 40px;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  width: 350px;
  height: 375px;
  background-color: ${(props) => props.theme.colors.cardBackground};
  border: 1px solid ${(props) => props.theme.colors.cardBorder};
  box-shadow: 0 0 10px ${(props) => props.theme.colors.shadow};
  position: relative;
`;

export const Title = styled.h1`
  margin: 30px 20px 0px 20px;
  color: ${(props) => props.theme.colors.fontGrey};
`;

export const P = styled.p`
  margin-block-end: 0.5em;
`;

export const Label = styled.label`
  margin-left: 22px;
  height: 40px;
  width: 100%;
  padding: 15px 10px;
  border-radius 5px;
  border 1px solid;
  border-color: ${(props) => props.theme.colors.bopsPurpleTransparent3};

  &:focus-within {
    border-color: ${(props) => props.theme.colors.bopsPurple};
  }
`;

export const Input = styled.input`
  margin-top: 40px;
  height: 30px;
  width: 80%;
  background-color: transparent;
  outline: 0;
  border-width: 0;
  color: ${(props) => props.theme.colors.fontGrey};
  border-color: ${(props) => props.theme.colors.cardBorder};
  padding: 5px 0px;
  font-size: 14px;

  ::placeholder {
    color: ${(props) => props.theme.colors.transparentLighGrey};
  }
`;

export const Form = styled.form`
  margin: 10px auto;
  display: block;
`;

export const FormContainer = styled.div``;

export const ButtonContainer = styled.div`
  margin-top: 45px;
  display: flex;
  justify-content: center;
`;

export const Button = styled.button`
  cursor: pointer;
  height: 45px;
  width: 85%;
  border-radius: 5px;
  border-color: ${(props) => props.theme.colors.bopsPurple};
  background-color: ${(props) => props.theme.colors.bopsPurple};
  color: ${(props) => props.theme.colors.fontGrey};
  font-size: 14px;
  font-weight: 600;

  &:hover {
    background-color: ${(props) => props.theme.colors.bopsPurpleTransparent3};
  }
`;

export const ErrorMessage = styled.div`
  position: absolute;
  top: 75px;
  left: 25px;
  color: ${(props) => props.theme.colors.errorRed};

  ::before {
    display: inline;
    content: '⚠ '; //TODO use fontawesome?
  }
`;
