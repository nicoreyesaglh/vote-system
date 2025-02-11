import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { VoteProvider } from './context/VoteContext';
import { ThemeProvider } from '@mui/material/styles';
import theme from './utils/theme.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <VoteProvider>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
            <App />
          </BrowserRouter>
          </ThemeProvider>
      </VoteProvider>
    </AuthProvider>
  </React.StrictMode>
);
