// theme.js
// Central theme file for Son's Stack


export const lightTheme = {
  mode: 'light',
  background: '#f7f7fa',
  overlay: 'radial-gradient(circle at 20% 0%, #fffbe7cc 0%, #fff0 70%)',
  sidebar: '#fff',
  accent: '#f9d923',
  text: '#232323',
  border: '#f9d923',
  icon: '#f9d923',
  iconBg: '#fff',
  sunflowerImg: 'https://upload.wikimedia.org/wikipedia/commons/4/40/Sunflower_sky_backdrop.jpg',
  petal: { fill: '#f9d923', stroke: '#ffb300' },
  leaf: { fill: '#8bc34a', stroke: '#558b2f' },
  smallIconBg: '#fffbe7',
  card: {
    background: '#fff',
    boxShadow: '0 8px 32px 0 #f9d92322',
    borderRadius: 18,
    transition: 'all 0.5s cubic-bezier(.4,2,.6,1)',
    hover: {
      transform: 'scale(1.03)',
      boxShadow: '0 12px 36px 0 #f9d92344',
      filter: 'brightness(1.05)',
    },
  },
  button: {
    background: 'linear-gradient(90deg, #ffe066 60%, #fff 100%)',
    color: '#232323',
    boxShadow: '0 2px 8px #f9d92333',
    borderRadius: 24,
    hover: {
      filter: 'brightness(1.1)',
      boxShadow: '0 4px 16px #f9d92344',
    },
  },
  animation: {
    transition: 'all 0.7s cubic-bezier(.4,2,.6,1)',
    fade: 'fadeSun 0.7s',
  },
  content: {
    topMessage: '🌻 Welcome to Son\'s Stack',
    subtitle: 'Every question is a seed. Every answer helps you bloom.',
  },
};

export const darkTheme = {
  mode: 'dark',
  background: 'linear-gradient(to bottom, #0f172a 0%, #020617 100%)',
  overlay: 'radial-gradient(circle at 80% 0%, #23283a99 0%, #0000 70%)',
  sidebar: '#23283a',
  accent: '#7dd3fc',
  text: '#f5f5f5',
  border: '#7dd3fc',
  icon: '#7dd3fc',
  iconBg: '#23283a',
  sunflowerImg: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
  petal: { fill: '#7dd3fc', stroke: '#bae6fd' },
  leaf: { fill: '#64748b', stroke: '#7dd3fc' },
  smallIconBg: '#23283a',
  card: {
    background: 'rgba(30,34,54,0.95)',
    boxShadow: '0 8px 32px 0 #7dd3fc33',
    borderRadius: 18,
    transition: 'all 0.5s cubic-bezier(.4,2,.6,1)',
    hover: {
      transform: 'scale(1.03) translateY(-2px)',
      boxShadow: '0 12px 36px 0 #7dd3fc55',
      filter: 'brightness(1.08)',
    },
  },
  button: {
    background: 'linear-gradient(90deg, #23283a 60%, #0f172a 100%)',
    color: '#7dd3fc',
    boxShadow: '0 2px 8px #7dd3fc44',
    borderRadius: 24,
    hover: {
      filter: 'brightness(1.15)',
      boxShadow: '0 4px 16px #7dd3fc66',
    },
  },
  animation: {
    transition: 'all 0.7s cubic-bezier(.4,2,.6,1)',
    fade: 'fadeMoon 0.7s',
  },
  content: {
    topMessage: '🌙 Welcome back to Son\'s Stack',
    subtitle: 'In the stillness of night, clarity begins.',
  },
};
