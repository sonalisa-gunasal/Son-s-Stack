import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './pages/MainLayout';
import Menu from './pages/Menu';
import Admin from './pages/Admin';
import Login from './pages/Login';
import DashboardView from './pages/DashboardView';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from './ThemeProvider';

function App() {
  return (
    <ThemeProvider>
      <CssBaseline />
      <Router>
        <Routes>
          {/* Homepage uses no layout, just the garden */}
          <Route path="/" element={<Menu />} />
          {/* All other main pages use MainLayout */}
          {/* Dashboard view is a separate clean page, not using MainLayout */}
          <Route path="/category/:category" element={<DashboardView />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
