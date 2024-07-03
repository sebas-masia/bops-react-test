import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './Store';
import App from './app';

const ReduxProvider = ({ children, reduxStore }) => <Provider store={reduxStore}>{children}</Provider>;

test('renders learn react link', () => {
  const wrapper = (children) => <ReduxProvider reduxStore={store}>{children}</ReduxProvider>;

  render(wrapper(<App />));
  const linkElement = screen.getByText(/Welcome Back!/i);
  expect(linkElement).toBeInTheDocument();
});
