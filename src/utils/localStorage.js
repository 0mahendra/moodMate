import React from 'react';

export const saveEntry = (entry) => {
    const existing = JSON.parse(localStorage.getItem('moodEntries')) || [];
    existing.push(entry);
    localStorage.setItem('moodEntries', JSON.stringify(existing));
  };
  
  export const getAllEntries = () => {
    return JSON.parse(localStorage.getItem('moodEntries')) || [];
  };
  