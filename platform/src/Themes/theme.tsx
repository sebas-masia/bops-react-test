import { ThemeProvider } from 'styled-components';
import baseTheme from './baseTheme';

const Theme = ({ children }) => <ThemeProvider theme={baseTheme}>{children}</ThemeProvider>;

export default Theme;
