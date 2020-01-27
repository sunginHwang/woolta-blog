import { useState } from 'react';
import Cookies from 'js-cookie';
import { COOKIE_CONFIG, SETTING_THEME } from '../constants';

export default function useDarkMode(defaultTheme?: string) {
  let initTheme = defaultTheme;

  // 브라우저 기본 테마설정 정보 가져오가.
  const isBrowserInitTheme = typeof window !== 'undefined' && initTheme === '';

  if (isBrowserInitTheme) {
    // 브라우저 테마모드가 다크모드라면 다크모드로 초기 테마 값 서렁.
    const isBrowserDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    initTheme = isBrowserDarkMode && 'dark';
  }

  // 아무 설정이 없고 기본값도 없는 경우는(서버에서 테마값 준 정보 or 쿠키에 저장된 테마 정보) light 기본테마 설정.
  initTheme = initTheme || 'light';

  const [theme, setTheme] = useState(initTheme);

  const setMode = mode => {
    Cookies.set(SETTING_THEME, mode, COOKIE_CONFIG);
    setTheme(mode);
  };

  const toggleTheme = () => theme === 'light' ? setMode('dark') : setMode('light');

  return [theme, toggleTheme] as [string, typeof toggleTheme];
};