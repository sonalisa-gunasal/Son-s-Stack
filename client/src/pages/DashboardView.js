
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, List, ListItemButton, Paper, Accordion, AccordionSummary, AccordionDetails, IconButton, TextField } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { getTechnologies, getQuestions, addQuestion, editQuestion } from '../api';
import { useThemeContext } from '../ThemeProvider';

export default function DashboardView() {
    const { categoryId, techstackId } = useParams();
    const navigate = useNavigate();
    const { theme, darkMode, toggleTheme } = useThemeContext();
    const [techList, setTechList] = useState([]);
    const [selectedTech, setSelectedTech] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newQuestion, setNewQuestion] = useState('');
    const [newAnswer, setNewAnswer] = useState('');
    const [editingQIdx, setEditingQIdx] = useState(null);
    const [editingQ, setEditingQ] = useState('');
    const [editingA, setEditingA] = useState('');

    // Load tech stacks for selected category
    useEffect(() => {
        if (!categoryId) return;
        setLoading(true);
        getTechnologies(categoryId)
            .then(res => {
                const techs = res.data;
                setTechList(techs);
                // Auto-select first tech stack if techstackId is missing
                if (!techstackId && techs.length > 0) {
                    navigate(`/category/${categoryId}/techstack/${techs[0].id}`, { replace: true });
                }
            })
            .catch(() => setTechList([]))
            .finally(() => setLoading(false));
    }, [categoryId, techstackId, navigate]);

    // Set selected tech stack
    useEffect(() => {
        if (!techstackId || techList.length === 0) {
            setSelectedTech(null);
            return;
        }
        const found = techList.find(t => String(t.id) === String(techstackId));
        setSelectedTech(found || null);
    }, [techstackId, techList]);

    // Load questions for selected tech stack
    useEffect(() => {
        if (!selectedTech) {
            setQuestions([]);
            return;
        }
        setLoading(true);
        getQuestions(selectedTech.id)
            .then(res => setQuestions(Array.isArray(res.data) ? res.data : []))
            .catch(() => setQuestions([]))
            .finally(() => setLoading(false));
    }, [selectedTech]);

    // Add question
    const handleAddQuestion = async () => {
        if (!newQuestion.trim() || !newAnswer.trim() || !selectedTech) return;
        setLoading(true);
        try {
            await addQuestion(selectedTech.id, newQuestion.trim(), newAnswer.trim());
            const res = await getQuestions(selectedTech.id);
            setQuestions(Array.isArray(res.data) ? res.data : []);
            setNewQuestion('');
            setNewAnswer('');
        } catch {}
        setLoading(false);
    };

    // Edit question
    const handleEditQuestion = async (id) => {
        if (!editingQ.trim() || !editingA.trim() || !selectedTech) {
            setEditingQIdx(null);
            setEditingQ('');
            setEditingA('');
            return;
        }
        setLoading(true);
        try {
            await editQuestion(id, editingQ.trim(), editingA.trim());
            const res = await getQuestions(selectedTech.id);
            setQuestions(Array.isArray(res.data) ? res.data : []);
        } catch {}
        setLoading(false);
        setEditingQIdx(null);
        setEditingQ('');
        setEditingA('');
    };

    // Start editing
    const startEditQuestion = (idx, q, a) => {
        setEditingQIdx(idx);
        setEditingQ(q);
        setEditingA(a);
    };

    // Cancel editing
    const cancelEditQuestion = () => {
        setEditingQIdx(null);
        setEditingQ('');
        setEditingA('');
    };

    // UI
    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', background: theme.background }}>
            {/* Sidebar: Tech stacks */}
            <Box sx={{ width: 260, borderRight: `1px solid ${theme.accent}`, py: 4, px: 2, background: theme.sidebar }}>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 700, letterSpacing: 1, color: theme.icon }}>
                    Tech Stacks
                </Typography>
                <List>
                    {techList.map((tech, idx) => (
                        <ListItemButton
                            key={tech.id}
                            selected={selectedTech && selectedTech.id === tech.id}
                            onClick={() => navigate(`/category/${categoryId}/techstack/${tech.id}`)}
                            sx={{
                                borderRadius: 2,
                                mb: 1,
                                color: darkMode ? '#ffe066' : theme.icon,
                                fontWeight: 600,
                                fontSize: '1.08rem',
                                '& .MuiTypography-root': { color: darkMode ? '#ffe066' : theme.icon }
                            }}
                        >
                            {tech.name}
                        </ListItemButton>
                    ))}
                </List>
            </Box>

            {/* Main Content: Questions */}
            <Box sx={{ flex: 1, py: 6, px: { xs: 2, sm: 6, md: 10 } }}>
                <Typography variant="h4" sx={{ mb: 4, fontWeight: 700, letterSpacing: 1, color: theme.icon }}>
                    {selectedTech ? selectedTech.name : 'Select a Tech Stack'}
                </Typography>
                {questions.length === 0 && (
                    <Typography sx={{ fontStyle: 'italic', color: theme.text }}>No questions yet.</Typography>
                )}
                {questions.map((item, idx) => (
                    <Paper
                        key={item.id || idx}
                        elevation={0}
                        sx={{ mb: 3, borderRadius: 3, boxShadow: '0 2px 12px #0001', p: 0, overflow: 'hidden' }}
                    >
                        <Accordion sx={{ boxShadow: 'none', background: 'transparent' }}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                {editingQIdx === idx ? (
                                    <>
                                        <TextField
                                            size="small"
                                            value={editingQ}
                                            onChange={e => setEditingQ(e.target.value)}
                                            sx={{ mr: 1, width: '40%' }}
                                            onKeyDown={e => {
                                                if (e.key === 'Enter') handleEditQuestion(item.id);
                                                if (e.key === 'Escape') cancelEditQuestion();
                                            }}
                                        />
                                        <TextField
                                            size="small"
                                            value={editingA}
                                            onChange={e => setEditingA(e.target.value)}
                                            sx={{ width: '50%' }}
                                            onKeyDown={e => {
                                                if (e.key === 'Enter') handleEditQuestion(item.id);
                                                if (e.key === 'Escape') cancelEditQuestion();
                                            }}
                                        />
                                    </>
                                ) : (
                                    <Typography sx={{ fontWeight: 600 }}>{item.question}</Typography>
                                )}
                            </AccordionSummary>
                            <AccordionDetails>
                                {editingQIdx === idx ? null : (
                                    <Typography sx={{ fontSize: '1.07rem', opacity: 0.85 }}>{item.answer}</Typography>
                                )}
                                <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
                                    {editingQIdx === idx ? (
                                        <>
                                            <IconButton size="small" color="primary" onClick={() => handleEditQuestion(item.id)}>
                                                <EditIcon fontSize="small" />
                                            </IconButton>
                                            <IconButton size="small" onClick={cancelEditQuestion}>
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                        </>
                                    ) : (
                                        <IconButton size="small" onClick={() => startEditQuestion(idx, item.question, item.answer)}>
                                            <EditIcon fontSize="small" />
                                        </IconButton>
                                    )}
                                </Box>
                            </AccordionDetails>
                        </Accordion>
                    </Paper>
                ))}
                {/* Add question form */}
                {selectedTech && (
                    <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
                        <TextField
                            size="small"
                            label="Question"
                            value={newQuestion}
                            onChange={e => setNewQuestion(e.target.value)}
                            sx={{ flex: 2 }}
                            disabled={loading}
                        />
                        <TextField
                            size="small"
                            label="Answer"
                            value={newAnswer}
                            onChange={e => setNewAnswer(e.target.value)}
                            sx={{ flex: 3 }}
                            disabled={loading}
                        />
                        <IconButton color="primary" onClick={handleAddQuestion} disabled={loading || !newQuestion.trim() || !newAnswer.trim()}>
                            <AddIcon />
                        </IconButton>
                    </Box>
                )}
            </Box>
        </Box>
    );
}