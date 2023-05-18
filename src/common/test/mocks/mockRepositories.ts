import { Repositories } from 'modules/HomePage/useGetRepositories/service';

export const mockRepositories = [
  {
    id: 1,
    name: 'Repository 1',
    description: 'Repository description 1',
    stargazers_count: 1,
    language: 'TypeScript',
    html_url: 'https://github.com/microsoft/TypeScript',
  },
  {
    id: 2,
    name: 'Repository 2',
    description: 'Repository description 2',
    stargazers_count: 2,
    language: 'PHP',
    html_url: 'https://github.com/php/php-src',
  },
  {
    id: 3,
    name: 'Repository 3',
    description: 'Repository description 3',
    stargazers_count: 3,
    language: 'Go',
    html_url: 'https://github.com/golang/go',
  },
] as const satisfies Repositories;
