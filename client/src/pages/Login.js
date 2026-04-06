import React, { useState } from 'react';
import { useThemeContext } from '../ThemeProvider';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';
import { useAdmin } from '../AdminContext';

function Login() {
  const { theme, darkMode, toggleTheme } = useThemeContext();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { loginAdmin } = useAdmin();
  const handleLogin = async (e) => {
    e.preventDefault();
    // Placeholder: Replace with real API call
    if (password === 'admin123') {
      loginAdmin();
      navigate('/');
    } else {
      setError('Invalid password');
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', background: theme.background }}>
      <Paper sx={{ p: 4, minWidth: 320, background: theme.card.background, boxShadow: theme.card.boxShadow }} elevation={6}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h5" sx={{ color: theme.text }}>Admin Login</Typography>
          <Button onClick={toggleTheme} variant="outlined" sx={{ color: theme.icon, borderColor: theme.icon }}>{darkMode ? 'Light' : 'Dark'} Mode</Button>
        </Box>
        <form onSubmit={handleLogin}>
          <TextField
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={e => setPassword(e.target.value)}
            sx={{ mb: 2 }}
          />
          {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}
          <Button type="submit" variant="contained" color="primary" fullWidth>Login</Button>
        </form>
      </Paper>
    </Box>
  );
}

export default Login;
