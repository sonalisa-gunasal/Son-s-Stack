import React from 'react';
import styles from './TechCards.module.css';

const techs = [
  { name: 'Angular', color: '#dd0031', icon: 'angular' },
  { name: 'JavaScript', color: '#f7df1e', icon: 'js' },
  { name: 'HTML', color: '#e44d26', icon: 'html' },
  { name: 'CSS', color: '#2965f1', icon: 'css' },
];

function getIcon(icon) {
  switch (icon) {
    case 'angular':
      return <svg width="36" height="36" viewBox="0 0 36 36"><polygon points="18,3 33,8 30,29 18,33 6,29 3,8" fill="#fff" stroke="#dd0031" strokeWidth="2"/><polygon points="18,6 29,10 27,27 18,30 9,27 7,10" fill="#dd0031"/><text x="18" y="24" textAnchor="middle" fontSize="13" fill="#fff" fontWeight="bold">A</text></svg>;
    case 'js':
      return <svg width="36" height="36" viewBox="0 0 36 36"><rect x="4" y="4" width="28" height="28" rx="6" fill="#f7df1e" stroke="#222" strokeWidth="2"/><text x="18" y="24" textAnchor="middle" fontSize="15" fill="#222" fontWeight="bold">JS</text></svg>;
    case 'html':
      return <svg width="36" height="36" viewBox="0 0 36 36"><rect x="4" y="4" width="28" height="28" rx="6" fill="#e44d26" stroke="#222" strokeWidth="2"/><text x="18" y="24" textAnchor="middle" fontSize="13" fill="#fff" fontWeight="bold">HTML</text></svg>;
    case 'css':
      return <svg width="36" height="36" viewBox="0 0 36 36"><rect x="4" y="4" width="28" height="28" rx="6" fill="#2965f1" stroke="#222" strokeWidth="2"/><text x="18" y="24" textAnchor="middle" fontSize="13" fill="#fff" fontWeight="bold">CSS</text></svg>;
    default:
      return null;
  }
}

export default function TechCards() {
  // Scattered positions and rotations for each card
  const scatter = [
    { top: '0%', left: '8%', rotate: -2 },
    { top: '18%', left: '54%', rotate: 1.5 },
    { top: '38%', left: '22%', rotate: 2 },
    { top: '30%', left: '70%', rotate: -1.5 },
  ];
  return (
    <div className={styles.floatWrap}>
      {techs.map((t, i) => (
        <div
          key={t.name}
          className={styles.floatCard}
          style={{
            '--card-color': t.color,
            '--float-top': scatter[i].top,
            '--float-left': scatter[i].left,
            '--float-rot': `${scatter[i].rotate}deg`,
            '--float-anim': `float${i+1}`,
          }}
          tabIndex={0}
        >
          <div className={styles.icon}>{getIcon(t.icon)}</div>
          <div className={styles.label}>{t.name}</div>
        </div>
      ))}
    </div>
  );
}
