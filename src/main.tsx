// ✅ Temporarily disable StrictMode
// import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import { ThemeProvider as StylesThemeProvider } from '@mui/styles';

const theme = createTheme(); // You can customize this theme

ReactDOM.createRoot(document.getElementById('root')!).render(
  <MuiThemeProvider theme={theme}>
    <StylesThemeProvider theme={theme}>
      <App />
    </StylesThemeProvider>
  </MuiThemeProvider>,
);
