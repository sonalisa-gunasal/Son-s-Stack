import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
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
// Admin edit mode for tech stack
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function MainLayout() {
    const { theme, darkMode, toggleTheme } = useThemeContext();
    const muiTheme = useTheme();
    const isMobile = useMediaQuery(muiTheme.breakpoints.down('sm'));
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
            <Box component="main" sx={{ flexGrow: 1, p: { xs: 2, sm: 4 }, mt: 8, background: darkMode ? '#23283a' : theme.background, minHeight: '100vh' }}>
                <Outlet />
            </Box>
        </Box>
    );
            }
export default MainLayout;