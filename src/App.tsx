import { Global, ThemeProvider } from '@emotion/react';
import { GlobalResetStyle, GlobalTypographyStyle, theme } from '@/styles';
import { Router } from '@/routes';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Global styles={GlobalResetStyle} />
      <Global styles={GlobalTypographyStyle} />
      <Router />
    </ThemeProvider>
  );
}

export default App;
