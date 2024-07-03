import jwt_decode, { JwtPayload } from 'jwt-decode';

const tokenKey = 'token';

export const validateToken = (authToken: string | null): boolean => {
  if (!authToken) return false;

  try {
    const decoded = jwt_decode<JwtPayload>(authToken);
    const { exp } = decoded;

    const currentTime = new Date().getTime() / 1000;
    if (!exp || currentTime > exp) {
      throw Error('token expired');
    }
    return true;
  } catch (error) {
    return false;
  }
};

export const getValidToken = (): string | null => {
  const authToken = localStorage.getItem(tokenKey) || '';
  return validateToken(authToken) ? authToken : null;
};

export const saveToken = (userToken: string): void => localStorage.setItem(tokenKey, userToken);

export const clearToken = (): void => localStorage.removeItem(tokenKey);
