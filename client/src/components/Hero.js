import React from 'react';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <h1 className={styles.title}>Son’s Stack</h1>
      <h2 className={styles.subtitle}>Learn by Day, Master by Night</h2>
    </section>
  );
}
