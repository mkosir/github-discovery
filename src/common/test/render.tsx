import { ThemeProvider } from '@mui/material/styles';
import { QueryClient, QueryClientProvider, QueryKey } from '@tanstack/react-query';
import { render, RenderOptions, RenderResult } from '@testing-library/react';

import { theme } from 'common/mui';

type RenderWithTheme = (elm: React.ReactElement, renderOptions?: RenderOptions) => RenderResult;

export const renderWithTheme: RenderWithTheme = (component, renderOptions?) => {
  const wrapper: RenderOptions['wrapper'] = ({ children }) => <ThemeProvider theme={theme}>{children}</ThemeProvider>;

  return render(component, {
    wrapper,
    ...renderOptions,
  });
};

const queryClientTest = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
      retry: 0,
    },
  },
});

export const renderAll = (
  elm: React.ReactElement,
  renderOptions?: RenderOptions,
  reactQueryData?: { queryKey: QueryKey; data: unknown },
) => {
  if (reactQueryData) {
    queryClientTest.setQueryData(reactQueryData.queryKey, reactQueryData.data);
  }

  const wrapper: RenderOptions['wrapper'] = ({ children }) => (
    <QueryClientProvider client={queryClientTest}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </QueryClientProvider>
  );
  return render(elm, { wrapper, ...renderOptions });
};
