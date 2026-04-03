import React from 'react';
import styles from './SearchBar.module.css';

export default function SearchBar({ value, onChange, placeholder }) {
  return (
    <div className={styles.searchBar}>
      <input
        className={styles.input}
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder || 'Search...'}
        aria-label="Search"
      />
      <span className={styles.icon}>
        <svg width="22" height="22" fill="none" viewBox="0 0 22 22"><circle cx="10" cy="10" r="7" stroke="var(--search-icon)" strokeWidth="2"/><line x1="16" y1="16" x2="21" y2="21" stroke="var(--search-icon)" strokeWidth="2" strokeLinecap="round"/></svg>
      </span>
    </div>
  );
}
