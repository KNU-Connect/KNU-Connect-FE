import { Global, ThemeProvider } from '@emotion/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GlobalResetStyle, GlobalTypographyStyle, theme } from '@/styles';
import { Router } from '@/routes';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Global styles={GlobalResetStyle} />
        <Global styles={GlobalTypographyStyle} />
        <Router />
        <ToastContainer
          position='top-center'
          autoClose={2000}
          hideProgressBar
          closeOnClick
          pauseOnHover
          theme='light'
        />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
