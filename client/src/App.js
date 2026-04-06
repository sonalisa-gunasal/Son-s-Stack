import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Menu from './pages/Menu';
import Login from './pages/Login';
import DashboardView from './pages/DashboardView';
import MainLayout from './pages/MainLayout';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from './ThemeProvider';
import { AdminProvider } from './AdminContext';

function App() {
  return (
    <AdminProvider>
      <ThemeProvider>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/" element={<Menu />} />
            <Route element={<MainLayout />}>
              <Route path="/category/:categoryId/techstack/:techstackId" element={<DashboardView />} />
            </Route>
            <Route path="/login" element={<Login />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </AdminProvider>
  );
}

export default App;
