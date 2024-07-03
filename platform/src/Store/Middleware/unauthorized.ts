import { MiddlewareAPI, isRejectedWithValue, Middleware } from '@reduxjs/toolkit';
import { clearToken } from '../../authentication';
import { AuthorizationSliceName } from '../Authorization';

const unauthorizedMW: Middleware = (api: MiddlewareAPI) => (next) => (action) => {
  const isAuthorizationCall = () => action.type.includes(AuthorizationSliceName);

  if (isRejectedWithValue(action) && !isAuthorizationCall()) {
    const { payload } = action || {};
    const { originalStatus } = payload || {};

    if (originalStatus === 401) {
      clearToken();
      window.location.replace('/login');
    }
  }

  return next(action);
};

export default unauthorizedMW;
