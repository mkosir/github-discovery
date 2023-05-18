import { MutationCache, QueryCache, QueryClient, QueryClientConfig } from '@tanstack/react-query';

const queryClientConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0,
    },
  },
  queryCache: new QueryCache({
    onError: (error) => console.error('Error: ', error),
  }),
  mutationCache: new MutationCache({
    onError: (error) => console.error('Error: ', error),
  }),
};

export const reactQueryClient = new QueryClient(queryClientConfig);
