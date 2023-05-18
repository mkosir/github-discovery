import { format } from 'date-fns';

import { githubService } from 'common/api/githubService';

export const GITHUB_AVAILABLE_LANGUAGES = ['All', 'JavaScript', 'TypeScript', 'PHP', 'Swift', 'Go'] as const;
export type GitHubAvailableLanguages = (typeof GITHUB_AVAILABLE_LANGUAGES)[number];

const GITHUB_DATE_FORMAT = 'yyyy-MM-dd';

export type GetRepositoriesParams = {
  createdFrom: Date;
  sort?: 'stars' | 'forks';
  order?: 'asc' | 'desc';
  language?: GitHubAvailableLanguages;
};

export type GetRepositoriesResponse = {
  total_count: string;
  items: ReadonlyArray<Repository>;
};

type Repository = {
  id: number;
  name: string;
  description: string;
  stargazers_count: number;
  language: string;
  html_url: string;
};

export const getRepositories = async (params: GetRepositoriesParams) => {
  const { createdFrom, language, ...serializableParams } = params;

  let qSerialized = `created:>${format(createdFrom, GITHUB_DATE_FORMAT)}`;
  qSerialized += language ? `+language:${language}` : '';

  const { data } = await githubService<GetRepositoriesResponse>({
    method: 'GET',
    url: `/search/repositories?q=${qSerialized}`,
    params: serializableParams,
  });

  return data;
};
