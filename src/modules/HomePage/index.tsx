import { Box, Typography, CircularProgress, LinearProgress, Divider } from '@mui/material';
import { endOfDay, subDays } from 'date-fns';
import { BooleanParam, NumericArrayParam, useQueryParam, withDefault } from 'use-query-params';

import { RepositoriesFilter } from './RepositoriesFilter';
import { RepositoryItem } from './RepositoryItem';
import { updateFavourites } from './updateFavourites';
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

  const handleChangeBookmark = (repositoryId: number) => {
    const favouritesUpdated = updateFavourites({
      favouriteRepositoryIds: favouriteRepositoryIds as Array<number>,
      repositoryId,
    });
    setFavouriteRepositoryIds(favouritesUpdated);
  };

  const repositories = areFavouritesFiltered
    ? repositoriesResponse?.items.filter((item) =>
        favouriteRepositoryIds.some((favouriteRepositoryId) => favouriteRepositoryId === item.id),
      )
    : repositoriesResponse?.items;

  return (
    <Box m={5}>
      <Typography variant="h4">GitHub Discovery</Typography>
      <Box sx={{ my: 1 }}>
        <RepositoriesFilter
          areFavouritesFiltered={areFavouritesFiltered}
          onChangeFavourites={setAreFavouritesFiltered}
          language={languageFilter}
          onChangeLanguage={setLanguageFilter}
        />
      </Box>
      {isFetching ? <LinearProgress sx={{ height: '1px' }} /> : <Divider />}
      <Box sx={{ mt: 1 }}>
        {!repositories ? (
          <CircularProgress />
        ) : (
          repositories.map((repository) => (
            <Box key={repository.id} sx={{ mb: 1 }}>
              <RepositoryItem
                name={repository.name}
                description={repository.description}
                url={repository.html_url}
                numOfStars={repository.stargazers_count}
                language={repository.language}
                isBookmarked={favouriteRepositoryIds.some(
                  (favouriteRepositoryId) => favouriteRepositoryId === repository.id,
                )}
                onChangeBookmark={() => handleChangeBookmark(repository.id)}
              />
            </Box>
          ))
        )}
      </Box>
    </Box>
  );
};
