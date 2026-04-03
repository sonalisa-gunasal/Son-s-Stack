import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Paper, List, ListItem, ListItemText } from '@mui/material';

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
  const { category } = useParams();
  const list = questions[category] || [];
  return (
    <Box sx={{ p: 4 }}>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h4" sx={{ mb: 2, color: 'secondary.main', fontWeight: 'bold' }}>{category}</Typography>
        <List>
          {list.length === 0 && <Typography>No questions yet.</Typography>}
          {list.map((item, idx) => (
            <ListItem key={idx}>
              <ListItemText
                primary={item.q}
                secondary={item.a}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
}

export default QuestionPage;
