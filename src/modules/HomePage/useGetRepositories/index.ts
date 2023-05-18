import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';

import { getRepositories, GetRepositoriesParams, GetRepositoriesResponse } from './service';

type UseGetRepositoriesParams = GetRepositoriesParams & {
  options?: UseQueryOptions<GetRepositoriesResponse>;
};

type UseGetRepositories = (params: UseGetRepositoriesParams) => UseQueryResult<GetRepositoriesResponse>;

export const QK_GET_REPOSITORIES = ({ createdFrom, sort, order, language }: GetRepositoriesParams) => [
  'getRepositories',
  { createdFrom, sort, order, language },
];

export const useGetRepositories: UseGetRepositories = ({ createdFrom, sort, order, language, options }) =>
  useQuery<GetRepositoriesResponse>({
    queryKey: QK_GET_REPOSITORIES({ createdFrom, sort, order, language }),
    queryFn: () => getRepositories({ createdFrom, sort, order, language }),
    ...options,
  });
