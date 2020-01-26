import { useState } from 'react';
import Cookies from 'js-cookie';
import { COOKIE_CONFIG, SETTING_THEME } from '../constants';

export default function useDarkMode(defaultTheme?: string) {
  let initTheme = defaultTheme;

  const isBrowserInitTheme = typeof window !== 'undefined' && initTheme === '';

  if (isBrowserInitTheme) {
    const isBrowserDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    initTheme = isBrowserDarkMode && 'dark';
  }

  initTheme = initTheme || 'light';

  const [theme, setTheme] = useState(initTheme);

  const setMode = mode => {
    Cookies.set(SETTING_THEME, mode, COOKIE_CONFIG);
    setTheme(mode);
  };


  const toggleTheme = () => {
    theme === 'light' ? setMode('dark') : setMode('light');
  };

  return [theme, toggleTheme] as [string, typeof toggleTheme];
};