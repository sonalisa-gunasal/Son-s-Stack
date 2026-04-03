import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Paper, List, ListItem, ListItemText } from '@mui/material';
import { useThemeContext } from '../ThemeProvider';

// Placeholder questions for demo
const questions = {
  HTML: [
    { q: 'What is a semantic tag?', a: 'A semantic tag clearly describes its meaning to both the browser and the developer.' },
    { q: 'How do you create a link in HTML?', a: 'Using the <a> tag.' }
  ],
  CSS: [
    { q: 'What is Flexbox?', a: 'A CSS layout model for arranging items in a container.' }
  ],
  // ...other categories
};

function QuestionPage() {
  const { theme, darkMode, toggleTheme } = useThemeContext();
  const { category } = useParams();
  const list = questions[category] || [];
  return (
    <Box sx={{ p: 4, minHeight: '100vh', background: theme.background }}>
      <Paper sx={{ p: 3, mb: 3, background: theme.card.background, boxShadow: theme.card.boxShadow }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h4" sx={{ color: theme.icon, fontWeight: 'bold' }}>{category}</Typography>
          <Button onClick={toggleTheme} variant="outlined" sx={{ color: theme.icon, borderColor: theme.icon }}>{darkMode ? 'Light' : 'Dark'} Mode</Button>
        </Box>
        <List>
          {list.length === 0 && <Typography sx={{ color: theme.text }}>No questions yet.</Typography>}
          {list.map((item, idx) => (
            <ListItem key={idx}>
              <ListItemText
                primary={<span style={{ color: theme.text }}>{item.q}</span>}
                secondary={<span style={{ color: theme.text, opacity: 0.8 }}>{item.a}</span>}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
}

export default QuestionPage;
