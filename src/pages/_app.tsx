import { CacheProvider } from '@emotion/react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { NextAdapter } from 'next-query-params';
import { QueryParamProvider } from 'use-query-params';

import { theme, createEmotionCache } from 'common/mui';
import { reactQueryClient } from 'common/reactQueryClient';

const clientSideEmotionCache = createEmotionCache();

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>GitHub Discovery</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <QueryClientProvider client={reactQueryClient}>
        <QueryParamProvider adapter={NextAdapter}>
          <CacheProvider value={clientSideEmotionCache}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              {<Component {...pageProps} />}
            </ThemeProvider>
          </CacheProvider>
        </QueryParamProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
};

export default App;
