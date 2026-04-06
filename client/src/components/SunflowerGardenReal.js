import React, { useRef, useState, useEffect } from 'react';
import { getCategories, getTechnologies } from '../api';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/sunflower-garden.module.css';
import { useThemeContext } from '../ThemeProvider';
import AdminPanelSettingsRoundedIcon from '@mui/icons-material/AdminPanelSettingsRounded';

function SunflowerGardenReal() {
  const SUNFLOWER = require('../assets/sunflower.png');
  const MOON = require('../assets/moon.png');
  const SUNFLOWER_BG = require('../assets/sunflower-bg.jpg');
  const MOON_BG = require('../assets/moon_bg.jpg');

  const navigate = useNavigate();
  const { theme, darkMode, toggleTheme } = useThemeContext();
  const [transitioning, setTransitioning] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [step, setStep] = useState(0); // 0: idle, 1: highlight, 2: blur/dim, 3: camera zoom, 4: white fade
  const transitionTimeout = useRef();
  // Use moon as main image in dark mode
  // If you have a PNG petal, use it here. Otherwise, comment out PETAL_IMG and petals below.
  // const PETAL_IMG = require('../assets/petal.png');

  // Map backend categories to sunflower visuals
  const sunflowerMap = [
    { dbname: 'Frontend', name: 'Bloom', desc: 'Frontend (UI, user-facing)', x: '22%', size: 220, z: 3, sway: 0.5 },
    { dbname: 'Backend', name: 'Roots', desc: 'Backend (logic, APIs)', x: '48%', size: 220, z: 4, sway: 1.1 },
    { dbname: 'DB', name: 'Soil', desc: 'Database & Storage', x: '74%', size: 220, z: 3, sway: 1.7 },
  ];
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  // Load categories from backend on mount
  useEffect(() => {
    setLoadingCategories(true);
    getCategories()
      .then(res => {
        // Map backend categories to sunflower visuals
        setCategories(res.data.map((c, i) => {
          const map = sunflowerMap.find(s => s.dbname === c.name);
          return map
            ? { ...c, ...map }
            : { ...c, name: c.name, desc: c.description, x: `${22 + i * 26}%`, size: 220, z: 3, sway: 0.5 + i * 0.6 };
        }));
      })
      .catch(e => {
        setCategories([]);
        console.error('Failed to load categories', e);
      })
      .finally(() => setLoadingCategories(false));
  }, []);
  // Background sunflowers (blurred, smaller, not interactive)
  const bgFlowers = [
    { x: '6%', size: 90, blur: 4, z: 0, sway: 0.2 },
    { x: '22%', size: 70, blur: 6, z: 0, sway: 0.5 },
    { x: '40%', size: 110, blur: 5, z: 0, sway: 1.1 },
    { x: '62%', size: 80, blur: 7, z: 0, sway: 1.5 },
    { x: '84%', size: 100, blur: 5, z: 0, sway: 1.9 },
  ];
  const handleCategoryClick = async (cat, idx) => {
    if (transitioning) return;
    setTransitioning(true);
    setSelectedIdx(idx);
    setStep(1);
    // Step 1: highlight (100ms)
    setTimeout(() => setStep(2), 100);
    // Step 2: blur/dim (150ms)
    setTimeout(() => setStep(3), 250);
    // Step 3: camera zoom (350ms)
    setTimeout(() => setStep(4), 600);
    // Step 4: fade to white and navigate (250ms)
    // Fetch techs for this category and navigate to first tech
    transitionTimeout.current = setTimeout(async () => {
      try {
        // Fetch tech stacks for this category only (API now supports filtering)
        const techRes = await getTechnologies(cat.id);
        const techs = techRes.data;
        const firstTech = techs[0];
        if (firstTech) {
          navigate(`/category/${cat.id}/techstack/${firstTech.id}`);
        } else {
          navigate(`/category/${encodeURIComponent(cat.name)}`);
        }
      } catch (e) {
        navigate(`/category/${encodeURIComponent(cat.name)}`);
      }
    }, 850);
  };

  // Cleanup timeout if unmounted
  React.useEffect(() => () => clearTimeout(transitionTimeout.current), []);

  // Calculate center for zoom
  const centerX = '50vw';
  const centerY = '48vh';

  // Camera zoom transform
  let sceneTransform = '';
  let sceneFilter = '';
  let sceneTransition = '';
  let overlayOpacity = 0;
  let overlayScale = 1;
  let overlayTransition = '';
  let whiteFade = false;
  if (transitioning) {
    if (step >= 3 && selectedIdx != null) {
      // Camera zoom: scale and translate scene so selected flower moves to center
      // Get flower X position as %
      const flower = categories[selectedIdx];
      // flower.x is percent string, e.g. '22%'
      const flowerX = parseFloat(flower.x) / 100;
      const flowerY = 0.88; // bottom: 2% from bottom, so 88% from top
      // Target center: 0.5, 0.48
      const dx = 0.5 - flowerX;
      const dy = 0.48 - flowerY;
      const scale = 2.2;
      sceneTransform = `scale(${scale}) translate(${dx * 100 / scale}vw, ${dy * 100 / scale}vh)`;
      sceneTransition = 'transform 0.38s cubic-bezier(.4,2,.6,1)';
      sceneFilter = 'blur(2.5px) brightness(1.04)';
      overlayOpacity = 0.7;
      overlayScale = 2.2;
      overlayTransition = 'opacity 0.38s, transform 0.38s';
    } else if (step === 2) {
      sceneFilter = 'blur(1.5px) brightness(0.98)';
      sceneTransition = 'filter 0.18s cubic-bezier(.4,2,.6,1)';
      overlayOpacity = 0.0;
      overlayScale = 1;
      overlayTransition = 'none';
    }
    if (step >= 4) {
      whiteFade = true;
    }
  }

  return (
    <div style={{ position: 'relative', minHeight: '100vh', width: '100vw', overflow: 'hidden', background: theme.background }}>
      {/* White fade overlay */}
      {whiteFade && <div className={styles.whiteFade} />}
      {/* Warm light overlay expanding from flower */}
      {transitioning && selectedIdx != null && (
        <div
          className={styles.warmOverlay}
          style={{
            opacity: overlayOpacity,
            transform: `scale(${overlayScale})`,
            left: categories[selectedIdx].x,
            transition: overlayTransition,
          }}
        />
      )}
      {/* Main scene with camera movement */}
      <div
        className={styles.scene}
        style={{
          minHeight: '100vh',
          width: '100vw',
          overflow: 'hidden',
          background: theme.background,
          position: 'relative',
          filter: sceneFilter,
          transform: sceneTransform,
          transition: sceneTransition,
        }}
      >
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
        {/* Dim overlay during transition */}
        {transitioning && step >= 2 && <div className={styles.dimOverlay} style={{ background: 'rgba(255, 245, 180, 0.13)', transition: 'background 0.4s' }} />}
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
        {!loadingCategories && categories.map((cat, i) => {
          // Animation states
          let flowerClass = styles.flowerWrap;
          let imgClass = styles.fgFlowerReal;
          let labelClass = styles.flowerLabel;
          let descClass = styles.flowerDesc;
          let style = { left: cat.x, width: cat.size, zIndex: 10 + cat.z };
          let imgStyle = {
            width: cat.size,
            animationDelay: `${cat.sway}s`,
            zIndex: 2,
            transition: 'all 0.5s cubic-bezier(.4,2,.6,1)',
          };
          // Step 1: highlight selected
          if (transitioning && selectedIdx === i && step >= 1) {
            imgClass += ' ' + styles.selectedFlower;
          }
          // Step 2: fade out others
          if (transitioning && selectedIdx !== i && step >= 2) {
            flowerClass += ' ' + styles.flowerFade;
          }
          return (
            <div
              key={cat.name}
              className={flowerClass}
              style={style}
            >
              <div style={{ position: 'relative', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span className={labelClass} style={{
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
                  className={imgClass}
                  style={imgStyle}
                  tabIndex={0}
                  onClick={() => handleCategoryClick(cat, i)}
                />
                <span className={descClass} style={{
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
          );
        })}
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

        {/* Admin Login floating icon button bottom right with tooltip */}
        <div
          style={{
            position: 'fixed',
            right: 24,
            bottom: 24,
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <button
            onClick={() => navigate('/login')}
            style={{
              background: theme.card.background,
              color: theme.icon,
              border: `2px solid ${theme.accent}`,
              borderRadius: '50%',
              width: 56,
              height: 56,
              boxShadow: theme.card.boxShadow,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontSize: 0,
              position: 'relative',
              transition: 'background 0.3s',
            }}
            aria-label="Admin Login"
            className="admin-login-icon-btn"
            onMouseEnter={e => {
              const tip = e.currentTarget.nextSibling;
              if (tip) tip.style.opacity = 1;
            }}
            onMouseLeave={e => {
              const tip = e.currentTarget.nextSibling;
              if (tip) tip.style.opacity = 0;
            }}
          >
            <AdminPanelSettingsRoundedIcon style={{ fontSize: 32, color: theme.icon }} />
          </button>
          <span
            style={{
              opacity: 0,
              pointerEvents: 'none',
              position: 'absolute',
              right: 70,
              bottom: 12,
              background: theme.card.background,
              color: theme.icon,
              border: `1.5px solid ${theme.accent}`,
              borderRadius: 8,
              padding: '6px 16px',
              fontWeight: 600,
              fontSize: '1rem',
              boxShadow: theme.card.boxShadow,
              whiteSpace: 'nowrap',
              transition: 'opacity 0.2s',
            }}
            className="admin-login-tooltip"
          >
            Admin Login
          </span>
        </div>
      </div>
    </div>
  );
}

export default SunflowerGardenReal;
