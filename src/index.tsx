import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './state/store';
import { App } from './App';
import { BrowserRouter } from 'react-router-dom';
import { ColorModeContextProvider } from './components/ColorModeContext/ColorModeContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ColorModeContextProvider>
          <App />
        </ColorModeContextProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
