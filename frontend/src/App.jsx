import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Username from './components/Username';
import Dashboard from './components/Dashboard';
import Register from './components/Register';
import { AuthProvider, useAuth } from './components/AuthRouter';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginRoute />} />
          <Route path="/register" element={<RegisterRoute />} />
          <Route path="/dashboard" element={<ProtectedRoute />} />
          {/* Other routes */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

const LoginRoute = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/dashboard" /> : <Username />;
};

const RegisterRoute = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/dashboard" /> : <Register />;
};

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Dashboard /> : <Navigate to="/login" />;
};

export default App;
