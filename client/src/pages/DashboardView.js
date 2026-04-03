import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, List, ListItemButton, Paper, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useThemeContext } from '../ThemeProvider';

import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded';
import NightlightRoundRoundedIcon from '@mui/icons-material/NightlightRoundRounded';


// Technologies per category
const techByCategory = {
  Bloom: ['Angular', 'React', 'JavaScript', 'HTML', 'CSS'],
  Roots: ['Node.js', 'Express', 'Java', 'Python', 'Go'],
  Soil: ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'SQLite'],
};

// Example questions per tech
const questionsByTech = {
  Angular: [
    { q: 'What is Angular?', a: 'A TypeScript-based open-source web application framework.' },
    { q: 'What is a component?', a: 'A building block of Angular applications.' },
  ],
  React: [
    { q: 'What is React?', a: 'A JavaScript library for building user interfaces.' },
    { q: 'What is a hook?', a: 'A special function that lets you use state and other React features.' },
  ],
  JavaScript: [
    { q: 'What is closure?', a: 'A closure is a function having access to the parent scope, even after the parent function has closed.' },
  ],
  HTML: [
    { q: 'What is a semantic tag?', a: 'A semantic tag clearly describes its meaning to both the browser and the developer.' },
  ],
  CSS: [
    { q: 'What is Flexbox?', a: 'A CSS layout model for arranging items in a container.' },
  ],
  'Node.js': [
    { q: 'What is Node.js?', a: 'A JavaScript runtime built on Chrome\'s V8 JavaScript engine.' },
  ],
  Express: [
    { q: 'What is Express?', a: 'A minimal and flexible Node.js web application framework.' },
  ],
  Java: [
    { q: 'What is the JVM?', a: 'Java Virtual Machine, runs Java bytecode.' },
  ],
  Python: [
    { q: 'What is a list comprehension?', a: 'A concise way to create lists in Python.' },
  ],
  Go: [
    { q: 'What is a goroutine?', a: 'A lightweight thread managed by the Go runtime.' },
  ],
  MongoDB: [
    { q: 'What is MongoDB?', a: 'A NoSQL document database.' },
  ],
  PostgreSQL: [
    { q: 'What is PostgreSQL?', a: 'A powerful, open source object-relational database system.' },
  ],
  MySQL: [
    { q: 'What is MySQL?', a: 'An open-source relational database management system.' },
  ],
  Redis: [
    { q: 'What is Redis?', a: 'An in-memory data structure store, used as a database, cache, and message broker.' },
  ],
  SQLite: [
    { q: 'What is SQLite?', a: 'A C-language library that implements a small, fast, self-contained SQL database engine.' },
  ],
};

export default function DashboardView() {
  const navigate = useNavigate();
  const { theme, darkMode, toggleTheme } = useThemeContext();
  // Header bar with theme switch and home button
  const Header = () => (
    <Box
      sx={{
        width: '100%',
        position: 'sticky',
        top: 0,
        zIndex: 10,
        background: theme.background,
        borderBottom: `1.5px solid ${theme.accent}55`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: { xs: 1, sm: 4 },
        py: 1.2,
        boxShadow: `0 2px 12px ${theme.accent}11`,
        mb: 2,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <IconButton
          aria-label="Go to homepage"
          onClick={() => navigate('/')}
          sx={{
            background: theme.card.background,
            border: `2px solid ${theme.accent}`,
            mr: 1,
            '&:hover': { background: theme.overlay },
          }}
        >
          <HomeIcon sx={{ color: theme.icon }} />
        </IconButton>
        <Typography variant="h6" sx={{ color: theme.icon, fontWeight: 700, letterSpacing: 1, fontFamily: 'cursive' }}>
          Son's Stack
        </Typography>
      </Box>
      <IconButton
        aria-label="Toggle theme"
        onClick={toggleTheme}
        sx={{
          background: theme.card.background,
          border: `2px solid ${theme.accent}`,
          ml: 1,
          '&:hover': { background: theme.overlay },
        }}
      >
        {darkMode ? <NightlightRoundRoundedIcon sx={{ color: theme.icon }} /> : <WbSunnyRoundedIcon sx={{ color: theme.icon }} />}
      </IconButton>
    </Box>
  );
  const { category } = useParams();
  const techList = techByCategory[category] || [];
  const [selectedTech, setSelectedTech] = useState(techList[0] || '');

  // Sunflower-tinted background
  const bg = theme.background;
  const sidebarBg = theme.sidebar;

  return (
    <Box sx={{ minHeight: '100vh', background: bg }}>
      <Header />
      <Box sx={{ display: 'flex', minHeight: 'calc(100vh - 64px)' }}>
        {/* Sidebar */}
        <Box
          sx={{
            width: { xs: 120, sm: 220, md: 260 },
            background: sidebarBg,
            borderRight: `1.5px solid ${theme.accent}55`,
            py: 4,
            px: 2,
            boxShadow: `4px 0 24px ${theme.accent}22`,
            position: 'sticky',
            top: 0,
            minHeight: '100vh',
            zIndex: 2,
          }}
        >
          <Typography variant="h6" sx={{ mb: 3, color: theme.icon, fontWeight: 700, letterSpacing: 1 }}>
            {category}
          </Typography>
          <List>
            {techList.map((tech) => (
              <ListItemButton
                key={tech}
                selected={selectedTech === tech}
                onClick={() => setSelectedTech(tech)}
                sx={{
                  mb: 1,
                  borderRadius: 2,
                  background: selectedTech === tech ? theme.card.background : 'transparent',
                  color: selectedTech === tech ? theme.icon : theme.text,
                  fontWeight: selectedTech === tech ? 700 : 500,
                  boxShadow: selectedTech === tech ? `0 2px 8px ${theme.accent}33` : 'none',
                  transition: 'all 0.2s',
                  '&:hover': {
                    background: theme.overlay,
                    color: theme.icon,
                  },
                }}
              >
                {tech}
              </ListItemButton>
            ))}
          </List>
        </Box>

        {/* Main Content */}
        <Box sx={{ flex: 1, py: 6, px: { xs: 2, sm: 6, md: 10 }, background: 'transparent' }}>
          <Typography variant="h4" sx={{ mb: 4, color: theme.icon, fontWeight: 700, letterSpacing: 1 }}>
            {selectedTech}
          </Typography>
          {(questionsByTech[selectedTech] || []).length === 0 && (
            <Typography sx={{ color: theme.text, fontStyle: 'italic' }}>No questions yet.</Typography>
          )}
          {(questionsByTech[selectedTech] || []).map((item, idx) => (
            <Paper
              key={idx}
              elevation={0}
              sx={{
                mb: 3,
                borderRadius: 3,
                boxShadow: `0 2px 12px ${theme.accent}22`,
                background: theme.card.background,
                p: 0,
                overflow: 'hidden',
                transition: 'box-shadow 0.3s',
                '&:hover': { boxShadow: `0 4px 24px ${theme.accent}44` },
              }}
            >
              <Accordion sx={{ boxShadow: 'none', background: 'transparent' }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography sx={{ fontWeight: 600, color: theme.text }}>{item.q}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography sx={{ color: theme.text, fontSize: '1.07rem', opacity: 0.85 }}>{item.a}</Typography>
                </AccordionDetails>
              </Accordion>
            </Paper>
          ))}
        </Box>
      </Box>
    </Box>
  );
}