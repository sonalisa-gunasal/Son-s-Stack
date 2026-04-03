import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Box, CssBaseline, AppBar, Toolbar, Typography, Button, Drawer, useTheme, useMediaQuery, List, ListItem, ListItemButton, ListItemIcon, ListItemText, IconButton, Switch as MuiSwitch } from '@mui/material';
import { Link } from 'react-router-dom';
import CodeIcon from '@mui/icons-material/Code';
import HtmlIcon from '@mui/icons-material/Language';
import CssIcon from '@mui/icons-material/Brush';
import JsIcon from '@mui/icons-material/Javascript';
import StorageIcon from '@mui/icons-material/Storage';
import AngularIcon from '@mui/icons-material/ChangeHistory';
import NodeIcon from '@mui/icons-material/CloudQueue';
import CategoryIcon from '@mui/icons-material/Category';
import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded';
import NightlightRoundRoundedIcon from '@mui/icons-material/NightlightRoundRounded';
import { useThemeContext } from '../ThemeProvider';

const drawerWidth = 260;

// SVG Sunflower Petal
const Petal = ({ style }) => (
    <svg width="32" height="48" viewBox="0 0 32 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
        <ellipse cx="16" cy="24" rx="14" ry="22" fill="#f9d923" stroke="#ffb300" strokeWidth="2" />
    </svg>
);

// SVG Sunflower Leaf
const Leaf = ({ style }) => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
        <path d="M16 2 Q30 16 16 30 Q2 16 16 2 Z" fill="#8bc34a" stroke="#558b2f" strokeWidth="2" />
    </svg>
);

const getCategoryIcon = (name, darkMode) => {
    const iconColor = darkMode ? '#ffe066' : '#f9d923';
    switch (name) {
        case 'HTML':
        case 'Advanced HTML':
            return <HtmlIcon sx={{ color: iconColor }} />;
        case 'CSS':
            return <CssIcon sx={{ color: iconColor }} />;
        case 'JS':
        case 'Advanced JS':
            return <JsIcon sx={{ color: iconColor }} />;
        case 'Advanced TS':
        case 'TS':
            return <CodeIcon sx={{ color: iconColor }} />;
        case 'Angular':
            return <AngularIcon sx={{ color: iconColor }} />;
        case 'Node':
            return <NodeIcon sx={{ color: iconColor }} />;
        case 'Camunda':
            return <StorageIcon sx={{ color: iconColor }} />;
        default:
            return <CategoryIcon sx={{ color: iconColor }} />;
    }
};

const categories = [
    { name: 'HTML' },
    { name: 'CSS' },
    { name: 'JS' },
    { name: 'Advanced HTML' },
    { name: 'Advanced TS' },
    { name: 'Advanced JS' },
    { name: 'Angular' },
    { name: 'TS' },
    { name: 'Node' },
    { name: 'Camunda' },
];



function MainLayout() {
    const muiTheme = useTheme();
    const isMobile = useMediaQuery(muiTheme.breakpoints.down('sm'));
    const location = useLocation();
    const { theme, darkMode, toggleTheme } = useThemeContext();

    const drawer = (
        <Box sx={{
            height: '100%',
            background: theme.sidebar,
            borderTopRightRadius: 60,
            borderBottomRightRadius: 60,
            boxShadow: `8px 0 32px -12px ${theme.accent}44`,
            position: 'relative',
            overflow: 'hidden',
            borderRight: `2px solid ${theme.border}`,
        }}>
            {/* Sunflower petals at the top */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Petal style={{ transform: 'rotate(-10deg) translateY(-8px)' }} />
                <Petal style={{ transform: 'rotate(10deg) translateY(-8px)' }} />
            </Box>
            <Toolbar sx={{ flexDirection: 'column', alignItems: 'center', mb: 1 }}>
                <Box component={Link} to="/" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textDecoration: 'none', cursor: 'pointer' }}>
                    <img
                        src={theme.sunflowerImg}
                        alt="Sunflower"
                        style={{ width: 60, height: 60, borderRadius: '50%', border: `2px solid ${theme.accent}`, marginBottom: 8, objectFit: 'cover', background: theme.iconBg }}
                        onError={e => { e.target.src = darkMode ? lightTheme.sunflowerImg : darkTheme.sunflowerImg; }}
                    />
                </Box>
                <Typography variant="h5" sx={{ fontWeight: 'bold', color: theme.text, letterSpacing: 1, fontFamily: 'cursive', textShadow: darkMode ? '2px 2px 8px #23283a' : '2px 2px 8px #fff' }}>
                    Son's Stack
                </Typography>
            </Toolbar>
            <List sx={{ mt: 2 }}>
                {categories.map((cat, idx) => (
                    <ListItem key={cat.name} disablePadding sx={{ mb: 1, position: 'relative' }}>
                        {/* Animated leaf on every other item */}
                        {idx % 2 === 0 && <Leaf style={{ position: 'absolute', left: -18, top: 10, opacity: 0.18, animation: 'leaf-sway 2s infinite alternate' }} />}
                        <ListItemButton
                            component={Link}
                            to={`/category/${encodeURIComponent(cat.name)}`}
                            sx={{
                                borderRadius: 3,
                                mx: 2,
                                py: 1.5,
                                px: 2,
                                background: theme.smallIconBg,
                                boxShadow: `0 2px 8px 0 ${theme.accent}22`,
                                border: `2px solid ${theme.accent}`,
                                transition: 'all 0.2s',
                                '&:hover': {
                                    background: darkMode ? '#2d3142' : '#fffde4',
                                    transform: 'scale(1.04)',
                                    boxShadow: `0 4px 16px 0 ${theme.accent}33`,
                                },
                            }}
                        >
                            <ListItemIcon sx={{ minWidth: 36 }}>{getCategoryIcon(cat.name, darkMode)}</ListItemIcon>
                            <ListItemText
                                primary={<Typography sx={{ fontWeight: 600, fontSize: '1.1rem', color: theme.icon }}>{cat.name}</Typography>}
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            {/* Sunflower petals at the bottom */}
            <Box sx={{ display: 'flex', justifyContent: 'center', position: 'absolute', bottom: 0, width: '100%', mb: 2 }}>
                <Petal style={{ transform: 'rotate(-20deg) translateY(8px)' }} />
                <Petal style={{ transform: 'rotate(20deg) translateY(8px)' }} />
            </Box>
        </Box>
    );

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', background: theme.background }}>
            <CssBaseline />
            <AppBar position="fixed" elevation={0} sx={{ zIndex: muiTheme.zIndex.drawer + 1, background: theme.background, color: theme.icon, borderBottom: `2px solid ${theme.accent}` }}>
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold', letterSpacing: 1, fontFamily: 'cursive', color: theme.icon, textShadow: darkMode ? '2px 2px 8px #23283a' : '2px 2px 8px #fff' }}>
                        Son's Stack
                    </Typography>
                    {/* Enhanced Theme Toggle Button */}
                    <Box sx={{
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        ml: 2,
                    }}>
                        <IconButton
                            onClick={toggleTheme}
                            aria-label="Toggle theme"
                            sx={{
                                width: 54,
                                height: 54,
                                borderRadius: '50%',
                                background: darkMode
                                    ? 'radial-gradient(circle at 60% 40%, #23283a 60%, #7dd3fc33 100%)'
                                    : 'radial-gradient(circle at 60% 40%, #fffbe7 60%, #ffe06688 100%)',
                                border: `2.5px solid ${theme.accent}`,
                                boxShadow: darkMode
                                    ? '0 0 16px 2px #7dd3fc66, 0 2px 8px #23283a88'
                                    : '0 0 16px 2px #ffe06666, 0 2px 8px #ffe06688',
                                color: theme.icon,
                                transition: 'all 0.4s cubic-bezier(.4,2,.6,1)',
                                '&:hover': {
                                    transform: 'scale(1.12)',
                                    boxShadow: darkMode
                                        ? '0 0 32px 4px #7dd3fc99, 0 4px 16px #23283a99'
                                        : '0 0 32px 4px #ffe06699, 0 4px 16px #ffe06699',
                                    background: darkMode
                                        ? 'radial-gradient(circle at 60% 40%, #23283a 40%, #7dd3fc88 100%)'
                                        : 'radial-gradient(circle at 60% 40%, #fffbe7 40%, #ffe066cc 100%)',
                                },
                            }}
                        >
                            {darkMode ? <NightlightRoundRoundedIcon fontSize="large" /> : <WbSunnyRoundedIcon fontSize="large" />}
                        </IconButton>
                    </Box>
                    <Button color="inherit" component={Link} to="/login" sx={{ fontWeight: 'bold', background: theme.sidebar, color: theme.icon, ml: 2, borderRadius: 2, border: `2px solid ${theme.accent}`, boxShadow: `0 2px 8px 0 ${theme.accent}22`, '&:hover': { background: darkMode ? '#23283a' : '#fffde4' } }}>
                        Admin Login
                    </Button>
                </Toolbar>
            </AppBar>
            <Drawer
                variant={isMobile ? 'temporary' : 'permanent'}
                open
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        background: theme.sidebar,
                        borderTopRightRadius: 60,
                        borderBottomRightRadius: 60,
                        boxShadow: `8px 0 32px -12px ${theme.accent}44`,
                        borderRight: `2px solid ${theme.border}`,
                        overflow: 'hidden',
                    },
                }}
            >
                {drawer}
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: { xs: 2, sm: 4 }, mt: 8, background: theme.background, minHeight: '100vh' }}>
                <Outlet />
            </Box>
            {/* Petal/leaf animation keyframes */}
            <style>{`
        @keyframes leaf-sway {
          0% { transform: rotate(-10deg) scale(1); }
          100% { transform: rotate(10deg) scale(1.08); }
        }
      `}</style>
        </Box>
    );
}

export default MainLayout;
