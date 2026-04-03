import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/sunflower-garden.module.css';
import { useThemeContext } from '../ThemeProvider';

const SUNFLOWER = require('../assets/sunflower.png');
const MOON = require('../assets/moon.png');
const SUNFLOWER_BG = require('../assets/sunflower-bg.jpg');
const MOON_BG = require('../assets/moon_bg.jpg');

// Use moon as main image in dark mode
// If you have a PNG petal, use it here. Otherwise, comment out PETAL_IMG and petals below.
// const PETAL_IMG = require('../assets/petal.png');

// Themed categories as large sunflowers
const categories = [
  { name: 'Bloom', desc: 'Frontend (UI, user-facing)', x: '22%', size: 220, z: 3, sway: 0.5 },
  { name: 'Roots', desc: 'Backend (logic, APIs)', x: '48%', size: 220, z: 4, sway: 1.1 },
  { name: 'Soil', desc: 'Database & Storage', x: '74%', size: 220, z: 3, sway: 1.7 },
];
// Background sunflowers (blurred, smaller, not interactive)
const bgFlowers = [
  { x: '6%', size: 90, blur: 4, z: 0, sway: 0.2 },
  { x: '22%', size: 70, blur: 6, z: 0, sway: 0.5 },
  { x: '40%', size: 110, blur: 5, z: 0, sway: 1.1 },
  { x: '62%', size: 80, blur: 7, z: 0, sway: 1.5 },
  { x: '84%', size: 100, blur: 5, z: 0, sway: 1.9 },
];

export default function SunflowerGardenReal() {
  const navigate = useNavigate();
  const { theme, darkMode, toggleTheme } = useThemeContext();

  // Petal drift positions (if you have a PNG petal, enable PETAL_IMG and this array)
  // const petals = [
  //   { left: '12vw', delay: 0 },
  //   { left: '38vw', delay: 4 },
  //   { left: '62vw', delay: 8 },
  //   { left: '80vw', delay: 2 },
  // ];

  const handleCategoryClick = (cat) => {
    navigate(`/category/${encodeURIComponent(cat.name)}`);
  };

  return (
    <div className={styles.scene} style={{ minHeight: '100vh', width: '100vw', overflow: 'hidden', background: theme.background }}>
      {/* Background image changes with theme */}
      <img src={darkMode ? MOON_BG : SUNFLOWER_BG} alt={darkMode ? 'Moonlit garden' : 'Sunrise sky'} className={styles.skyReal} style={{ opacity: 1, transition: 'opacity 0.7s', zIndex: 0 }} />
      {/* Overlay changes with theme */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: theme.overlay,
        mixBlendMode: darkMode ? 'normal' : 'screen',
        zIndex: 1,
        pointerEvents: 'none',
        transition: 'background 0.5s',
      }} />
      {/* Blurred background icons */}
      {bgFlowers.map((f, i) => (
        <img
          key={i}
          src={darkMode ? MOON : SUNFLOWER}
          alt={darkMode ? 'Moon' : 'Sunflower'}
          className={styles.bgFlowerReal}
          style={{
            left: f.x,
            width: f.size,
            filter: darkMode
              ? `blur(${f.blur + 2}px) brightness(0.85)`
              : `blur(${f.blur}px) brightness(0.93)`,
            zIndex: f.z,
            animationDelay: `${f.sway}s`,
            opacity: darkMode ? 0.7 : 1,
            transition: theme.animation.transition,
          }}
        />
      ))}
      {/* Foreground icons (themed categories) */}
      {categories.map((cat, i) => (
        <div
          key={cat.name}
          className={styles.flowerWrap}
          style={{ left: cat.x, width: cat.size, zIndex: 10 + cat.z }}
        >
          <div style={{ position: 'relative', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span className={styles.flowerLabel} style={{
              position: 'absolute',
              top: '38%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'none',
              minWidth: '90px',
              textAlign: 'center',
              fontSize: '1.5rem',
              background: darkMode ? 'rgba(30,34,54,0.7)' : 'rgba(0,0,0,0.18)',
              color: darkMode ? '#7dd3fc' : '#fffbe7',
              padding: '0.13em 1em',
              borderRadius: '0.7em',
              boxShadow: '0 2px 12px #0006',
              zIndex: 3
            }}>{darkMode ? (cat.name === 'Bloom' ? 'Glow' : cat.name === 'Roots' ? 'Shadows' : 'Night Soil') : cat.name}</span>
            <img
              src={darkMode ? MOON : SUNFLOWER}
              alt={darkMode ? 'Moon' : cat.name}
              className={styles.fgFlowerReal}
              style={{
                width: cat.size,
                animationDelay: `${cat.sway}s`,
                zIndex: 2
              }}
              tabIndex={0}
              onClick={() => handleCategoryClick(cat)}
            />
            <span className={styles.flowerDesc} style={{
              position: 'absolute',
              top: '62%',
              left: '50%',
              transform: 'translate(-50%, 0)',
              minWidth: '90px',
              textAlign: 'center',
              background: darkMode ? 'rgba(30,34,54,0.8)' : 'rgba(0,0,0,0.22)',
              color: darkMode ? '#bae6fd' : '#ffe066',
              padding: '0.08em 0.7em',
              borderRadius: '0.5em',
              boxShadow: '0 1px 8px #0003',
              zIndex: 3
            }}>{darkMode
              ? (cat.name === 'Bloom'
                  ? 'Frontend (UI, glowing interfaces)'
                  : cat.name === 'Roots'
                  ? 'Backend (logic, hidden flows)'
                  : 'Database & Storage (night memory)')
              : cat.desc}
            </span>
          </div>
        </div>
      ))}
      {/* Title and subtitle */}
      <div className={styles.centerText}>
        <h1 className={styles.title}>{theme.content.topMessage}</h1>
        <h2 className={styles.subtitle}>{theme.content.subtitle}</h2>
      </div>

      {/* Theme switcher button bottom left */}
      <button
        onClick={toggleTheme}
        style={{
          position: 'fixed',
          left: 24,
          bottom: 24,
          zIndex: 100,
          background: theme.button.background,
          border: 'none',
          borderRadius: '50%',
          width: 64,
          height: 64,
          boxShadow: theme.button.boxShadow,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'background 0.3s',
        }}
        aria-label="Toggle theme"
      >
        <img
          src={darkMode ? SUNFLOWER : MOON}
          alt={darkMode ? 'Switch to day mode' : 'Switch to night mode'}
          style={{ width: 38, height: 38, filter: theme.button.color }}
        />
      </button>
    </div>
  );
}
