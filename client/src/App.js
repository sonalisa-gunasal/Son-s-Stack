import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './pages/MainLayout';
import Menu from './pages/Menu';
import Admin from './pages/Admin';
import Login from './pages/Login';
import QuestionPage from './pages/QuestionPage';
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
          <Route element={<MainLayout />}>
            <Route path="/category/:category" element={<QuestionPage />} />
          </Route>
          <Route path="/admin" element={<Admin />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
