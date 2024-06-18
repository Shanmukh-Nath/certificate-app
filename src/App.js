// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import VerificationPage from './Components/VerificationPage';
import LoginPage from './Components/LoginPage';
import DashboardPage from './Components/DashboardPage';
import UploadPage from './Components/UploadPage';
import CertificatesPage from './Components/CertificatesPage';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './theme';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<VerificationPage />} />
          <Route
            path="/login"
            element={
              isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage onLogin={handleLogin} />
            }
          />
          <Route
            path="/dashboard"
            element={
              isAuthenticated ? <DashboardPage /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/upload"
            element={
              isAuthenticated ? <UploadPage /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/certificates"
            element={
              isAuthenticated ? <CertificatesPage /> : <Navigate to="/login" />
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
