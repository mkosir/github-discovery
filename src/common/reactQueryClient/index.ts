import { MutationCache, QueryCache, QueryClient, QueryClientConfig } from '@tanstack/react-query';

const queryClientConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      // refetchOnWindowFocus: true,
      refetchOnWindowFocus: false, // TODO: remove (rate limit)
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
