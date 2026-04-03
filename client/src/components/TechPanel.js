import React from 'react';
import styles from '../styles/tech-panel.module.css';

export default function TechPanel({ open, tech, questions, onClose }) {
  return (
    <div className={styles.panel + (open ? ' ' + styles.open : '')}>
      <button className={styles.closeBtn} onClick={onClose} aria-label="Close panel">×</button>
      <div className={styles.panelContent}>
        <h2 className={styles.title}>{tech}</h2>
        <div className={styles.questions}>
          {questions.map((q, i) => (
            <details key={i} className={styles.accordion}>
              <summary>{q.question}</summary>
              <div className={styles.answer}>{q.answer}</div>
            </details>
          ))}
        </div>
      </div>
      {/* Decorative petals/sunflowers */}
      <div className={styles.decorPetal1}></div>
      <div className={styles.decorPetal2}></div>
    </div>
  );
}
