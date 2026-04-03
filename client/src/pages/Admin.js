import React, { useEffect, useState } from 'react';
import {
  getCategories, addCategory, editCategory, deleteCategory,
  getQuestions, addQuestion, editQuestion,
} from '../api';
import API from '../api';
import { useThemeContext } from '../ThemeProvider';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Paper, List, ListItem, ListItemText, TextField, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Tabs, Tab } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';


function Admin() {
  const { theme, darkMode, toggleTheme } = useThemeContext();
  const navigate = useNavigate();
  const [tab, setTab] = useState(0);

  // Categories state
  const [categories, setCategories] = useState([]);
  const [catOpen, setCatOpen] = useState(false);
  const [newCat, setNewCat] = useState('');
  const [editCatIndex, setEditCatIndex] = useState(null);
  const [editCatValue, setEditCatValue] = useState('');
  const [editCatId, setEditCatId] = useState(null);

  // Technologies state
  const [technologies, setTechnologies] = useState([]);
  const [techOpen, setTechOpen] = useState(false);
  const [newTech, setNewTech] = useState({ name: '', category_id: '', description: '' });
  const [editTechIndex, setEditTechIndex] = useState(null);
  const [editTech, setEditTech] = useState({ name: '', category_id: '', description: '' });
  const [editTechId, setEditTechId] = useState(null);

  // Questions state
  const [questions, setQuestions] = useState([]);
  const [questionOpen, setQuestionOpen] = useState(false);
  const [newQuestion, setNewQuestion] = useState({ technology_id: '', question: '', answer: '' });
  const [editQuestionIndex, setEditQuestionIndex] = useState(null);
  const [editQuestionObj, setEditQuestionObj] = useState({ question: '', answer: '' });
  const [editQuestionId, setEditQuestionId] = useState(null);

  // Fetch all data on mount
  useEffect(() => {
    if (localStorage.getItem('isAdmin') !== 'true') {
      navigate('/login');
      return;
    }
    getCategories().then(res => setCategories(res.data)).catch(() => setCategories([]));
    API.get('/technologies').then(res => setTechnologies(res.data)).catch(() => setTechnologies([]));
    API.get('/questions').then(res => setQuestions(res.data)).catch(() => setQuestions([]));
  }, [navigate]);

  // Category CRUD
  const handleAddCategory = async () => {
    if (newCat) {
      try {
        const res = await addCategory(newCat);
        setCategories([...categories, res.data]);
        setNewCat('');
        setCatOpen(false);
      } catch (e) {}
    }
  };
  const handleEditCategory = (idx) => {
    setEditCatIndex(idx);
    setEditCatValue(categories[idx].name);
    setEditCatId(categories[idx].id);
  };
  const handleEditCategorySave = async () => {
    try {
      const res = await editCategory(editCatId, editCatValue);
      const updated = [...categories];
      updated[editCatIndex] = res.data;
      setCategories(updated);
    } catch (e) {}
    setEditCatIndex(null);
    setEditCatValue('');
    setEditCatId(null);
  };
  const handleDeleteCategory = async (idx) => {
    const id = categories[idx].id;
    try {
      await deleteCategory(id);
      setCategories(categories.filter((_, i) => i !== idx));
    } catch (e) {}
  };

  // Technology CRUD
  const handleAddTech = async () => {
    if (newTech.name && newTech.category_id) {
      try {
        const res = await API.post('/technologies', newTech);
        setTechnologies([...technologies, res.data]);
        setNewTech({ name: '', category_id: '', description: '' });
        setTechOpen(false);
      } catch (e) {}
    }
  };
  const handleEditTech = (idx) => {
    setEditTechIndex(idx);
    setEditTech({
      name: technologies[idx].name,
      category_id: technologies[idx].category_id,
      description: technologies[idx].description || '',
    });
    setEditTechId(technologies[idx].id);
  };
  const handleEditTechSave = async () => {
    try {
      const res = await API.put(`/technologies/${editTechId}`, editTech);
      const updated = [...technologies];
      updated[editTechIndex] = res.data;
      setTechnologies(updated);
    } catch (e) {}
    setEditTechIndex(null);
    setEditTech({ name: '', category_id: '', description: '' });
    setEditTechId(null);
  };
  const handleDeleteTech = async (idx) => {
    const id = technologies[idx].id;
    try {
      await API.delete(`/technologies/${id}`);
      setTechnologies(technologies.filter((_, i) => i !== idx));
    } catch (e) {}
  };

  // Question CRUD
  const handleAddQuestion = async () => {
    if (newQuestion.technology_id && newQuestion.question && newQuestion.answer) {
      try {
        const res = await addQuestion(newQuestion.technology_id, newQuestion.question, newQuestion.answer);
        setQuestions([...questions, res.data]);
        setNewQuestion({ technology_id: '', question: '', answer: '' });
        setQuestionOpen(false);
      } catch (e) {}
    }
  };
  const handleEditQuestion = (idx) => {
    setEditQuestionIndex(idx);
    setEditQuestionObj({
      question: questions[idx].question,
      answer: questions[idx].answer,
    });
    setEditQuestionId(questions[idx].id);
  };
  const handleEditQuestionSave = async () => {
    try {
      const res = await editQuestion(editQuestionId, editQuestionObj.question, editQuestionObj.answer);
      const updated = [...questions];
      updated[editQuestionIndex] = res.data;
      setQuestions(updated);
    } catch (e) {}
    setEditQuestionIndex(null);
    setEditQuestionObj({ question: '', answer: '' });
    setEditQuestionId(null);
  };
  const handleDeleteQuestion = async (idx) => {
    const id = questions[idx].id;
    try {
      await API.delete(`/questions/${id}`);
      setQuestions(questions.filter((_, i) => i !== idx));
    } catch (e) {}
  };

  return (
    <Box sx={{ p: 4, minHeight: '100vh', background: theme.background }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ color: theme.icon, fontWeight: 700 }}>Admin Panel</Typography>
        <Button onClick={toggleTheme} variant="outlined" sx={{ color: theme.icon, borderColor: theme.icon }}>{darkMode ? 'Light' : 'Dark'} Mode</Button>
      </Box>
      <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 3 }}>
        <Tab label="Categories" />
        <Tab label="Technologies" />
        <Tab label="Questions" />
      </Tabs>
      {tab === 0 && (
        <Paper sx={{ p: 3, mb: 3, background: theme.card.background, boxShadow: theme.card.boxShadow }}>
          <Typography variant="h5" sx={{ mb: 2, color: theme.text }}>Manage Categories</Typography>
          <List>
            {categories.map((cat, idx) => (
              <ListItem key={cat.id} secondaryAction={
                <>
                  <IconButton edge="end" onClick={() => handleEditCategory(idx)}><EditIcon /></IconButton>
                  <IconButton edge="end" color="error" onClick={() => handleDeleteCategory(idx)} style={{ marginLeft: 8 }}>🗑️</IconButton>
                </>
              }>
                <ListItemText primary={cat.name} primaryTypographyProps={{ style: { color: theme.text } }} />
              </ListItem>
            ))}
          </List>
          <Button startIcon={<AddIcon />} variant="contained" color="secondary" onClick={() => setCatOpen(true)} sx={{ mt: 2 }}>
            Add Category
          </Button>
          <Dialog open={catOpen} onClose={() => setCatOpen(false)}>
            <DialogTitle sx={{ background: theme.background, color: theme.text }}>Add Category</DialogTitle>
            <DialogContent sx={{ background: theme.background }}>
              <TextField label="Category Name" value={newCat} onChange={e => setNewCat(e.target.value)} fullWidth />
            </DialogContent>
            <DialogActions sx={{ background: theme.background }}>
              <Button onClick={() => setCatOpen(false)}>Cancel</Button>
              <Button onClick={handleAddCategory} variant="contained">Add</Button>
            </DialogActions>
          </Dialog>
          <Dialog open={editCatIndex !== null} onClose={() => setEditCatIndex(null)}>
            <DialogTitle sx={{ background: theme.background, color: theme.text }}>Edit Category</DialogTitle>
            <DialogContent sx={{ background: theme.background }}>
              <TextField label="Category Name" value={editCatValue} onChange={e => setEditCatValue(e.target.value)} fullWidth />
            </DialogContent>
            <DialogActions sx={{ background: theme.background }}>
              <Button onClick={() => setEditCatIndex(null)}>Cancel</Button>
              <Button onClick={handleEditCategorySave} variant="contained">Save</Button>
            </DialogActions>
          </Dialog>
        </Paper>
      )}
      {tab === 1 && (
        <Paper sx={{ p: 3, mb: 3, background: theme.card.background, boxShadow: theme.card.boxShadow }}>
          <Typography variant="h5" sx={{ mb: 2, color: theme.text }}>Manage Technologies</Typography>
          <List>
            {technologies.map((tech, idx) => (
              <ListItem key={tech.id} secondaryAction={
                <>
                  <IconButton edge="end" onClick={() => handleEditTech(idx)}><EditIcon /></IconButton>
                  <IconButton edge="end" color="error" onClick={() => handleDeleteTech(idx)} style={{ marginLeft: 8 }}>🗑️</IconButton>
                </>
              }>
                <ListItemText
                  primary={tech.name}
                  secondary={categories.find(c => c.id === tech.category_id)?.name || ''}
                  primaryTypographyProps={{ style: { color: theme.text } }}
                />
              </ListItem>
            ))}
          </List>
          <Button startIcon={<AddIcon />} variant="contained" color="secondary" onClick={() => setTechOpen(true)} sx={{ mt: 2 }}>
            Add Technology
          </Button>
          <Dialog open={techOpen} onClose={() => setTechOpen(false)}>
            <DialogTitle sx={{ background: theme.background, color: theme.text }}>Add Technology</DialogTitle>
            <DialogContent sx={{ background: theme.background }}>
              <TextField label="Name" value={newTech.name} onChange={e => setNewTech({ ...newTech, name: e.target.value })} fullWidth sx={{ mb: 2 }} />
              <TextField label="Category ID" value={newTech.category_id} onChange={e => setNewTech({ ...newTech, category_id: e.target.value })} fullWidth sx={{ mb: 2 }} />
              <TextField label="Description" value={newTech.description} onChange={e => setNewTech({ ...newTech, description: e.target.value })} fullWidth />
            </DialogContent>
            <DialogActions sx={{ background: theme.background }}>
              <Button onClick={() => setTechOpen(false)}>Cancel</Button>
              <Button onClick={handleAddTech} variant="contained">Add</Button>
            </DialogActions>
          </Dialog>
          <Dialog open={editTechIndex !== null} onClose={() => setEditTechIndex(null)}>
            <DialogTitle sx={{ background: theme.background, color: theme.text }}>Edit Technology</DialogTitle>
            <DialogContent sx={{ background: theme.background }}>
              <TextField label="Name" value={editTech.name} onChange={e => setEditTech({ ...editTech, name: e.target.value })} fullWidth sx={{ mb: 2 }} />
              <TextField label="Category ID" value={editTech.category_id} onChange={e => setEditTech({ ...editTech, category_id: e.target.value })} fullWidth sx={{ mb: 2 }} />
              <TextField label="Description" value={editTech.description} onChange={e => setEditTech({ ...editTech, description: e.target.value })} fullWidth />
            </DialogContent>
            <DialogActions sx={{ background: theme.background }}>
              <Button onClick={() => setEditTechIndex(null)}>Cancel</Button>
              <Button onClick={handleEditTechSave} variant="contained">Save</Button>
            </DialogActions>
          </Dialog>
        </Paper>
      )}
      {tab === 2 && (
        <Paper sx={{ p: 3, mb: 3, background: theme.card.background, boxShadow: theme.card.boxShadow }}>
          <Typography variant="h5" sx={{ mb: 2, color: theme.text }}>Manage Questions</Typography>
          <List>
            {questions.map((q, idx) => (
              <ListItem key={q.id} secondaryAction={
                <>
                  <IconButton edge="end" onClick={() => handleEditQuestion(idx)}><EditIcon /></IconButton>
                  <IconButton edge="end" color="error" onClick={() => handleDeleteQuestion(idx)} style={{ marginLeft: 8 }}>🗑️</IconButton>
                </>
              }>
                <ListItemText
                  primary={q.question}
                  secondary={technologies.find(t => t.id === q.technology_id)?.name || ''}
                  primaryTypographyProps={{ style: { color: theme.text } }}
                />
              </ListItem>
            ))}
          </List>
          <Button startIcon={<AddIcon />} variant="contained" color="secondary" onClick={() => setQuestionOpen(true)} sx={{ mt: 2 }}>
            Add Question
          </Button>
          <Dialog open={questionOpen} onClose={() => setQuestionOpen(false)}>
            <DialogTitle sx={{ background: theme.background, color: theme.text }}>Add Question</DialogTitle>
            <DialogContent sx={{ background: theme.background }}>
              <TextField label="Technology ID" value={newQuestion.technology_id} onChange={e => setNewQuestion({ ...newQuestion, technology_id: e.target.value })} fullWidth sx={{ mb: 2 }} />
              <TextField label="Question" value={newQuestion.question} onChange={e => setNewQuestion({ ...newQuestion, question: e.target.value })} fullWidth sx={{ mb: 2 }} />
              <TextField label="Answer" value={newQuestion.answer} onChange={e => setNewQuestion({ ...newQuestion, answer: e.target.value })} fullWidth />
            </DialogContent>
            <DialogActions sx={{ background: theme.background }}>
              <Button onClick={() => setQuestionOpen(false)}>Cancel</Button>
              <Button onClick={handleAddQuestion} variant="contained">Add</Button>
            </DialogActions>
          </Dialog>
          <Dialog open={editQuestionIndex !== null} onClose={() => setEditQuestionIndex(null)}>
            <DialogTitle sx={{ background: theme.background, color: theme.text }}>Edit Question</DialogTitle>
            <DialogContent sx={{ background: theme.background }}>
              <TextField label="Question" value={editQuestionObj.question} onChange={e => setEditQuestionObj({ ...editQuestionObj, question: e.target.value })} fullWidth sx={{ mb: 2 }} />
              <TextField label="Answer" value={editQuestionObj.answer} onChange={e => setEditQuestionObj({ ...editQuestionObj, answer: e.target.value })} fullWidth />
            </DialogContent>
            <DialogActions sx={{ background: theme.background }}>
              <Button onClick={() => setEditQuestionIndex(null)}>Cancel</Button>
              <Button onClick={handleEditQuestionSave} variant="contained">Save</Button>
            </DialogActions>
          </Dialog>
        </Paper>
      )}
    </Box>
  );
}

export default Admin;
