import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Paper, List, ListItem, ListItemText, TextField, Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

const initialCategories = [
  'HTML', 'CSS', 'JS', 'Advanced HTML', 'Advanced TS', 'Advanced JS', 'Angular', 'TS', 'Node', 'Camunda'
];

function Admin() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState(initialCategories);
  const [open, setOpen] = useState(false);
  const [newCat, setNewCat] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState('');

  useEffect(() => {
    if (localStorage.getItem('isAdmin') !== 'true') {
      navigate('/login');
    }
  }, [navigate]);

  const handleAdd = () => {
    if (newCat && !categories.includes(newCat)) {
      setCategories([...categories, newCat]);
      setNewCat('');
      setOpen(false);
    }
  };

  const handleEdit = (idx) => {
    setEditIndex(idx);
    setEditValue(categories[idx]);
  };

  const handleEditSave = () => {
    const updated = [...categories];
    updated[editIndex] = editValue;
    setCategories(updated);
    setEditIndex(null);
    setEditValue('');
  };

  return (
    <Box sx={{ p: 4 }}>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>Manage Categories</Typography>
        <List>
          {categories.map((cat, idx) => (
            <ListItem key={cat} secondaryAction={
              <IconButton edge="end" onClick={() => handleEdit(idx)}><EditIcon /></IconButton>
            }>
              <ListItemText primary={cat} />
            </ListItem>
          ))}
        </List>
        <Button startIcon={<AddIcon />} variant="contained" color="secondary" onClick={() => setOpen(true)} sx={{ mt: 2 }}>
          Add Category
        </Button>
      </Paper>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add Category</DialogTitle>
        <DialogContent>
          <TextField label="Category Name" value={newCat} onChange={e => setNewCat(e.target.value)} fullWidth />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleAdd} variant="contained">Add</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={editIndex !== null} onClose={() => setEditIndex(null)}>
        <DialogTitle>Edit Category</DialogTitle>
        <DialogContent>
          <TextField label="Category Name" value={editValue} onChange={e => setEditValue(e.target.value)} fullWidth />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditIndex(null)}>Cancel</Button>
          <Button onClick={handleEditSave} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Admin;
