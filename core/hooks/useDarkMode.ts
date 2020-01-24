// useDarkMode.js
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { COOKIE_CONFIG, SETTING_THEME } from '../constants';

export default function useDarkMode(defaultTheme?: string) {
  let initTheme = defaultTheme;

  const isBrowserInitTheme = typeof window !== 'undefined' && initTheme === '';
  console.log('isBrowserInitTheme : ' + isBrowserInitTheme);
  if (isBrowserInitTheme) {
    const isBrowserDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    console.log('isBrowserDarkMode : ' + isBrowserDarkMode);
    initTheme = isBrowserDarkMode && 'dark';
    console.log('끝' + initTheme);
  }

  initTheme = initTheme || 'light';

  const [theme, setTheme] = useState(initTheme);

  const setMode = mode => {
    Cookies.set(SETTING_THEME, mode, COOKIE_CONFIG);
    console.log('mode로 변경' + mode);
    setTheme(mode);
  };


  const toggleTheme = () => {
    console.log('toggleTheme 시작 ' + theme);
    theme === 'light' ? setMode('dark') : setMode('light');
  }

  useEffect(() => {
    console.log('theme 바뀜 : ' + theme);
  });

/*
  const [theme, setTheme] = useState('light');
*/

  return [theme, toggleTheme] as [string, typeof toggleTheme];
};