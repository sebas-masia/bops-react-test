import {
  Container,
  Image,
  ImageContainer,
  Title,
  Card,
  Input,
  Label,
  Form,
  Button,
  ButtonContainer,
  ErrorMessage,
} from './component.styles';
import { bopsLogo } from '../../Assets';

const Login = ({ handleSubmit, setUserName, setPassword, errorMessage }) => {
  return (
    <Container>
      <ImageContainer>
        <Image src={bopsLogo} alt="bops logo" />
      </ImageContainer>
      <Card>
        <Title>Welcome Back!</Title>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        <Form onSubmit={handleSubmit}>
          <Label htmlFor="username-input">
            <Input
              id="username-input"
              type="text"
              placeholder="Username"
              onChange={(e) => setUserName(e.target.value)}
              maxLength={20}
            />
          </Label>
          <Label htmlFor="password-input">
            <Input
              id="password-input"
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              maxLength={20}
            />
          </Label>
          <ButtonContainer>
            <Button type="submit">Sign In</Button>
          </ButtonContainer>
        </Form>
      </Card>
    </Container>
  );
};

export default Login;
