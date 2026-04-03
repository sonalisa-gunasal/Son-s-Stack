import React from 'react';
import styles from '../styles/immersive-bg.module.css';
import { useThemeContext } from '../ThemeProvider';

export default function ImmersiveBg() {
  const { darkMode } = useThemeContext();
  return (
    <div className={[
      styles.immersiveBg,
      darkMode ? styles.moon : styles.sunrise
    ].join(' ')}>
      {/* Petals or fireflies */}
      {!darkMode && <>
        <svg className={styles.petal + ' ' + styles.petal1} viewBox="0 0 32 48"><ellipse cx="16" cy="24" rx="14" ry="22" fill="#f9d923" stroke="#ffb300" strokeWidth="2" /></svg>
        <svg className={styles.petal + ' ' + styles.petal2} viewBox="0 0 32 48"><ellipse cx="16" cy="24" rx="14" ry="22" fill="#f9d923" stroke="#ffb300" strokeWidth="2" /></svg>
        <svg className={styles.petal + ' ' + styles.petal3} viewBox="0 0 32 48"><ellipse cx="16" cy="24" rx="14" ry="22" fill="#f9d923" stroke="#ffb300" strokeWidth="2" /></svg>
        <svg className={styles.petal + ' ' + styles.petal4} viewBox="0 0 32 48"><ellipse cx="16" cy="24" rx="14" ry="22" fill="#f9d923" stroke="#ffb300" strokeWidth="2" /></svg>
      </>}
      {darkMode && <>
        <div className={styles.firefly + ' ' + styles.firefly1}></div>
        <div className={styles.firefly + ' ' + styles.firefly2}></div>
        <div className={styles.firefly + ' ' + styles.firefly3}></div>
        <div className={styles.firefly + ' ' + styles.firefly4}></div>
        <div className={styles.stars}></div>
      </>}
      {/* Leaves (light) */}
      {!darkMode && <>
        <svg className={styles.leaf + ' ' + styles.leaf1} viewBox="0 0 32 32"><path d="M16 2 Q30 16 16 30 Q2 16 16 2 Z" fill="#8bc34a" stroke="#558b2f" strokeWidth="2" /></svg>
        <svg className={styles.leaf + ' ' + styles.leaf2} viewBox="0 0 32 32"><path d="M16 2 Q30 16 16 30 Q2 16 16 2 Z" fill="#8bc34a" stroke="#558b2f" strokeWidth="2" /></svg>
      </>}
      {/* Sunflower in corner (light) */}
      {!darkMode && <svg className={styles.sunflowerCorner} viewBox="0 0 120 120">
        <ellipse cx="60" cy="60" rx="38" ry="38" fill="#ffe066" />
        {[...Array(12)].map((_, i) => {
          const angle = (i * 30) * Math.PI / 180;
          const x1 = 60 + Math.cos(angle) * 38;
          const y1 = 60 + Math.sin(angle) * 38;
          return <ellipse key={i} cx={x1} cy={y1} rx="18" ry="38" fill="#f9d923" opacity="0.7" transform={`rotate(${i * 30},${x1},${y1})`} />;
        })}
        <ellipse cx="60" cy="60" rx="14" ry="14" fill="#fffbe7" opacity="0.7" />
      </svg>}
    </div>
  );
}
