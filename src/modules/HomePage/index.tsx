import { endOfDay, subDays } from 'date-fns';
import { BooleanParam, NumericArrayParam, useQueryParam, withDefault } from 'use-query-params';

import { HomeView } from './HomeView';
import { useGetRepositories } from './useGetRepositories';
import { GitHubAvailableLanguages } from './useGetRepositories/service';

export const HomePage = () => {
  const [languageFilter = 'All', setLanguageFilter] = useQueryParam<GitHubAvailableLanguages>('language');
  const [areFavouritesFiltered, setAreFavouritesFiltered] = useQueryParam(
    'favouritesFiltered',
    withDefault(BooleanParam, false),
  );
  const [favouriteRepositoryIds, setFavouriteRepositoryIds] = useQueryParam(
    'favourites',
    withDefault(NumericArrayParam, []),
  );

  const { data: repositoriesResponse, isFetching } = useGetRepositories({
    createdFrom: subDays(endOfDay(new Date()), 7),
    sort: 'stars',
    order: 'desc',
    language: languageFilter,
    options: { keepPreviousData: true },
  });

  return (
    <HomeView
      repositories={repositoriesResponse?.items}
      isFetching={isFetching}
      areFavouritesFiltered={areFavouritesFiltered}
      languageFilter={languageFilter}
      favouriteRepositoryIds={favouriteRepositoryIds as Array<number>}
      onChangeFavourites={setFavouriteRepositoryIds}
      onChangeFavouriteFilter={setAreFavouritesFiltered}
      onChangeLanguageFilter={setLanguageFilter}
    />
  );
};
