import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter for routing
import App from './App.jsx';
import { AuthProvider } from './AuthContext.jsx'; // Import AuthProvider for authentication context
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter> {/* Wrap the App component with BrowserRouter for routing */}
      <AuthProvider> {/* Wrap App with AuthProvider to provide auth context */}
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
