import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Paper, List, ListItem, ListItemText, IconButton, Button, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useThemeContext } from '../ThemeProvider';
import { useAdmin } from '../AdminContext';

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
  const [editIdx, setEditIdx] = React.useState(null);
  const [editQ, setEditQ] = React.useState('');
  const [editA, setEditA] = React.useState('');
  const [addMode, setAddMode] = React.useState(false);
  const [newQ, setNewQ] = React.useState('');
  const [newA, setNewA] = React.useState('');
  const { isAdmin } = useAdmin();
  const [list, setList] = React.useState(questions[category] || []);

  // Demo handlers (replace with API integration for real app)
  const handleEdit = (idx) => {
    setEditIdx(idx);
    setEditQ(list[idx].q);
    setEditA(list[idx].a);
  };
  const handleEditSave = () => {
    const updated = [...list];
    updated[editIdx] = { q: editQ, a: editA };
    setList(updated);
    setEditIdx(null);
    setEditQ('');
    setEditA('');
  };
  const handleDelete = (idx) => {
    setList(list.filter((_, i) => i !== idx));
  };
  const handleAdd = () => {
    setList([...list, { q: newQ, a: newA }]);
    setAddOpen(false);
    setNewQ('');
    setNewA('');
  };

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
            <ListItem
              key={idx}
              sx={{
                '&:hover .admin-actions': isAdmin ? { opacity: 1 } : {},
                alignItems: 'flex-start',
                py: 1.5,
              }}
              secondaryAction={
                isAdmin && (
                  <span className="admin-actions" style={{ opacity: 0.2, transition: 'opacity 0.2s', display: 'inline-flex' }}>
                    <IconButton edge="end" size="small" sx={{ mr: 0.5 }} onClick={() => handleEdit(idx)}><EditIcon fontSize="small" /></IconButton>
                    <IconButton edge="end" size="small" color="error" onClick={() => handleDelete(idx)}><DeleteIcon fontSize="small" /></IconButton>
                  </span>
                )
              }
            >
              {editIdx === idx ? (
                <Box sx={{ width: '100%' }}>
                  <TextField
                    value={editQ}
                    onChange={e => setEditQ(e.target.value)}
                    fullWidth
                    size="small"
                    sx={{ mb: 1 }}
                  />
                  <TextField
                    value={editA}
                    onChange={e => setEditA(e.target.value)}
                    fullWidth
                    size="small"
                    sx={{ mb: 1 }}
                  />
                  <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                    <Button size="small" variant="contained" color="primary" onClick={handleEditSave}>Save</Button>
                    <Button size="small" variant="outlined" onClick={() => setEditIdx(null)}>Cancel</Button>
                  </Box>
                </Box>
              ) : (
                <ListItemText
                  primary={<span style={{ color: theme.text }}>{item.q}</span>}
                  secondary={<span style={{ color: theme.text, opacity: 0.8 }}>{item.a}</span>}
                />
              )}
            </ListItem>
          ))}
          {isAdmin && !addMode && (
            <ListItem sx={{ py: 1.5 }}>
              <Button
                variant="text"
                color="secondary"
                size="small"
                onClick={() => setAddMode(true)}
                sx={{ opacity: 0.5, fontWeight: 600, fontSize: '1rem', textTransform: 'none' }}
              >
                + Add Question
              </Button>
            </ListItem>
          )}
          {isAdmin && addMode && (
            <ListItem sx={{ py: 1.5 }}>
              <Box sx={{ width: '100%' }}>
                <TextField
                  value={newQ}
                  onChange={e => setNewQ(e.target.value)}
                  fullWidth
                  size="small"
                  sx={{ mb: 1 }}
                  label="Question"
                />
                <TextField
                  value={newA}
                  onChange={e => setNewA(e.target.value)}
                  fullWidth
                  size="small"
                  sx={{ mb: 1 }}
                  label="Answer"
                />
                <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                  <Button size="small" variant="contained" color="primary" onClick={handleAdd}>Add</Button>
                  <Button size="small" variant="outlined" onClick={() => setAddMode(false)}>Cancel</Button>
                </Box>
              </Box>
            </ListItem>
          )}
        </List>
      </Paper>
    </Box>
  );
}

export default QuestionPage;
