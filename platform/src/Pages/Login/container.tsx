import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLoginMutation } from '@Store';
import { useAppSelector } from '../../hooks';
import Login from './component';

const LoginContainer = () => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [useLoginTrigger, resultPost] = useLoginMutation();
  const location = useLocation();
  const navigate = useNavigate();
  const authToken = useAppSelector((state) => state.auth.token);

  const { isSuccess, isError, error } = resultPost;

  useEffect(() => {
    if (isSuccess) {
      const { pathname, search } = (location.state as any) || {};
      const to = pathname && pathname !== 'login' ? `${pathname}${search}` : '/';
      navigate(to, { replace: true });
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      const { originalStatus } = (error as any) || {};
      const message = originalStatus === 401 ? 'Invalid username or password' : 'Error procesing request';

      setErrorMessage(message);
    }
  }, [isError]);

  const handleSubmit = (e) => {
    e.preventDefault();

    useLoginTrigger({ username, password });
  };

  useEffect(() => {
    if (authToken) {
      navigate('/', { replace: true });
    }
  }, [authToken]);

  return (
    <Login
      handleSubmit={handleSubmit}
      setUserName={setUserName}
      setPassword={setPassword}
      errorMessage={errorMessage}
    />
  );
};

export default LoginContainer;
