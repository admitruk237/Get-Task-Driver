import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppWithRedux from './App';
import { Provider } from 'react-redux';
import { store } from './state/store';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import '@fontsource/roboto';

const theme = createTheme({
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <AppWithRedux />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
