import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { VoteProvider } from './context/VoteContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <VoteProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
      </VoteProvider>
    </AuthProvider>
  </React.StrictMode>
);
