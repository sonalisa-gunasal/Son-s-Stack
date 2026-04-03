import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useThemeContext } from '../ThemeProvider';
import styles from '../styles/sunflower-garden.module.css';

const techs = [
  { name: 'Angular', color: '#dd0031', icon: 'angular', x: 18, y: 38, z: 1 },
  { name: 'JavaScript', color: '#f7df1e', icon: 'js', x: 44, y: 52, z: 2 },
  { name: 'HTML', color: '#e44d26', icon: 'html', x: 62, y: 44, z: 1 },
  { name: 'CSS', color: '#2965f1', icon: 'css', x: 80, y: 56, z: 0 },
];

function getIcon(icon) {
  switch (icon) {
    case 'angular':
      return <svg width="32" height="32" viewBox="0 0 36 36"><polygon points="18,3 33,8 30,29 18,33 6,29 3,8" fill="#fff" stroke="#dd0031" strokeWidth="2"/><polygon points="18,6 29,10 27,27 18,30 9,27 7,10" fill="#dd0031"/><text x="18" y="24" textAnchor="middle" fontSize="13" fill="#fff" fontWeight="bold">A</text></svg>;
    case 'js':
      return <svg width="32" height="32" viewBox="0 0 36 36"><rect x="4" y="4" width="28" height="28" rx="6" fill="#f7df1e" stroke="#222" strokeWidth="2"/><text x="18" y="24" textAnchor="middle" fontSize="15" fill="#222" fontWeight="bold">JS</text></svg>;
    case 'html':
      return <svg width="32" height="32" viewBox="0 0 36 36"><rect x="4" y="4" width="28" height="28" rx="6" fill="#e44d26" stroke="#222" strokeWidth="2"/><text x="18" y="24" textAnchor="middle" fontSize="13" fill="#fff" fontWeight="bold">HTML</text></svg>;
    case 'css':
      return <svg width="32" height="32" viewBox="0 0 36 36"><rect x="4" y="4" width="28" height="28" rx="6" fill="#2965f1" stroke="#222" strokeWidth="2"/><text x="18" y="24" textAnchor="middle" fontSize="13" fill="#fff" fontWeight="bold">CSS</text></svg>;
    default:
      return null;
  }
}

function Sunflower({ tech, idx, darkMode, onClick }) {
  // Sway animation delay for natural look
  const swayDelay = `${idx * 0.7 + Math.random()}s`;
  return (
    <div
      className={styles.sunflowerWrap}
      style={{
        left: `${tech.x}%`,
        bottom: `${tech.y}%`,
        zIndex: 10 + tech.z,
        animationDelay: swayDelay,
      }}
      tabIndex={0}
      onClick={() => onClick(tech)}
      aria-label={tech.name}
    >
      <div className={styles.sunflower + ' ' + (darkMode ? styles.night : '')}>
        <svg className={styles.flower} viewBox="0 0 120 120">
          <ellipse cx="60" cy="60" rx="38" ry="38" fill={darkMode ? '#64748b' : '#ffe066'} />
          {[...Array(12)].map((_, i) => {
            const angle = (i * 30) * Math.PI / 180;
            const x1 = 60 + Math.cos(angle) * 38;
            const y1 = 60 + Math.sin(angle) * 38;
            return <ellipse key={i} cx={x1} cy={y1} rx="18" ry="38" fill={darkMode ? '#64748b' : '#f9d923'} opacity="0.7" transform={`rotate(${i * 30},${x1},${y1})`} />;
          })}
          <ellipse cx="60" cy="60" rx="14" ry="14" fill="#fffbe7" opacity="0.7" />
        </svg>
        <span className={styles.icon}>{getIcon(tech.icon)}</span>
        <span className={styles.label}>{tech.name}</span>
      </div>
    </div>
  );
}

export default function SunflowerGarden() {
  const { darkMode } = useThemeContext();
  const navigate = useNavigate();
  // For zoom-in animation, track which flower is zoomed
  const [zoomed, setZoomed] = React.useState(null);

  const handleFlowerClick = (tech) => {
    setZoomed(tech.name);
    setTimeout(() => navigate(`/category/${encodeURIComponent(tech.name)}`), 700);
  };

  // Petal drift positions
  const petals = useMemo(() => [
    { left: '12vw', delay: 0 },
    { left: '38vw', delay: 4 },
    { left: '62vw', delay: 8 },
    { left: '80vw', delay: 2 },
  ], []);

  return (
    <div className={styles.scene + (darkMode ? ' ' + styles.night : '')}>
      {/* Sky gradient */}
      <div className={styles.sky} />
      {/* Sun or Moon */}
      <div className={styles.sunOrMoon} />
      {/* Blurred background sunflowers */}
      <div className={styles.bgFlowers}>
        {[...Array(7)].map((_, i) => (
          <svg key={i} className={styles.bgFlower} style={{ left: `${10 + i * 12}%`, bottom: `${18 + (i % 2) * 6}%`, filter: 'blur(3.5px)', opacity: 0.13 + 0.07 * (i % 2) }} viewBox="0 0 120 120">
            <ellipse cx="60" cy="60" rx="38" ry="38" fill={darkMode ? '#64748b' : '#ffe066'} />
            {[...Array(12)].map((_, j) => {
              const angle = (j * 30) * Math.PI / 180;
              const x1 = 60 + Math.cos(angle) * 38;
              const y1 = 60 + Math.sin(angle) * 38;
              return <ellipse key={j} cx={x1} cy={y1} rx="18" ry="38" fill={darkMode ? '#64748b' : '#f9d923'} opacity="0.7" transform={`rotate(${j * 30},${x1},${y1})`} />;
            })}
          </svg>
        ))}
      </div>
      {/* Foreground sunflowers (interactive) */}
      <div className={styles.fgFlowers + (zoomed ? ' ' + styles.zooming : '')}>
        {techs.map((t, i) => (
          <Sunflower key={t.name} tech={t} idx={i} darkMode={darkMode} onClick={handleFlowerClick} />
        ))}
      </div>
      {/* Petals drifting */}
      {!darkMode && petals.map((p, i) => (
        <svg key={i} className={styles.petal} style={{ left: p.left, animationDelay: `${p.delay}s` }} viewBox="0 0 32 48"><ellipse cx="16" cy="24" rx="14" ry="22" fill="#f9d923" stroke="#ffb300" strokeWidth="2" /></svg>
      ))}
      {/* Fireflies (dark mode) */}
      {darkMode && [0,1,2,3].map(i => (
        <div key={i} className={styles.firefly} style={{ left: `${18 + i*18}vw`, animationDelay: `${i*2.5}s` }} />
      ))}
      {/* Title and subtitle */}
      <div className={styles.centerText}>
        <h1 className={styles.title}>Son’s Stack</h1>
        <h2 className={styles.subtitle}>Pick a flower. Start your journey.</h2>
      </div>
    </div>
  );
}
