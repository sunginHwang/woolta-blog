import { ThemeProvider } from 'styled-components';
import darkTheme from '../../style/theme/dark';
import whiteTheme from '../../style/colors';
import * as React from 'react';

type Props = {
  children: React.ReactNode;
  theme: String;
};

function Theme({ children, theme }: Props) {
  const themeMode = theme === 'light' ? whiteTheme : darkTheme;

  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const body =
    <ThemeProvider theme={themeMode}>
      {children}
    </ThemeProvider>;

  // prevents ssr flash for mismatched dark mode
  if (!mounted) {
    return <div>{body}</div>;
  }

  return body;
}

export default Theme;

