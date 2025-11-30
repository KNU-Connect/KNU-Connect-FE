import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react({
        jsxImportSource: '@emotion/react',
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    define: {
      global: 'window',
    },
    server: {
      proxy: {
        '/ws': {
          target: env.VITE_API_PROXY_TARGET,
          changeOrigin: true,
          ws: true,
          secure: false,
          headers: {
            Origin: env.VITE_API_PROXY_TARGET,
          },
        },
        '/api': {
          target: env.VITE_API_PROXY_TARGET,
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
});