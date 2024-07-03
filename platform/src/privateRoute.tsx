import { Navigate, useLocation } from 'react-router-dom';
import { logout } from '@Store';
import { useAppSelector, useAppDispatch } from './hooks';
import { validateToken } from './authentication';

const PrivateRoute = ({ children }) => {
  const authToken = useAppSelector((state) => state.auth.token) || '';
  
  const location = useLocation();
  const { pathname, search } = location;

  return children;
};

export default PrivateRoute;
