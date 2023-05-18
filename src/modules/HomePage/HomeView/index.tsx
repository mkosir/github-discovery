import { Box, Typography, CircularProgress, LinearProgress, Divider } from '@mui/material';

import { GitHubAvailableLanguages, Repository } from '../useGetRepositories/service';

import { RepositoriesFilter } from './RepositoriesFilter';
import { RepositoryItem } from './RepositoryItem';
import { updateFavourites } from './updateFavourites';

export type HomeViewProps = {
  repositories: ReadonlyArray<Repository> | undefined;
  isFetching: boolean;
  areFavouritesFiltered: boolean;
  languageFilter: GitHubAvailableLanguages;
  favouriteRepositoryIds: ReadonlyArray<number>;
  onChangeFavourites: (favouriteRepositoryIds: Array<number>) => void;
  onChangeFavouriteFilter: (areFavouritesFiltered: boolean) => void;
  onChangeLanguageFilter: (language: GitHubAvailableLanguages) => void;
};

export const HomeView = ({
  repositories,
  isFetching,
  areFavouritesFiltered,
  languageFilter,
  favouriteRepositoryIds,
  onChangeFavourites,
  onChangeFavouriteFilter,
  onChangeLanguageFilter,
}: HomeViewProps) => {
  const handleChangeBookmark = (repositoryId: number) => {
    const favouritesUpdated = updateFavourites({
      favouriteRepositoryIds: favouriteRepositoryIds as Array<number>,
      repositoryId,
    });
    onChangeFavourites(favouritesUpdated);
  };

  const repositoriesFiltered = areFavouritesFiltered
    ? repositories?.filter((item) =>
        favouriteRepositoryIds.some((favouriteRepositoryId) => favouriteRepositoryId === item.id),
      )
    : repositories;

  return (
    <Box m={5}>
      <Typography variant="h4">GitHub Discovery</Typography>
      <Box sx={{ my: 1 }}>
        <RepositoriesFilter
          areFavouritesFiltered={areFavouritesFiltered}
          onChangeFavourites={onChangeFavouriteFilter}
          language={languageFilter}
          onChangeLanguage={onChangeLanguageFilter}
        />
      </Box>
      {isFetching ? <LinearProgress sx={{ height: '1px' }} /> : <Divider />}
      <Box sx={{ mt: 1 }}>
        {!repositoriesFiltered ? (
          <CircularProgress />
        ) : (
          repositoriesFiltered.map((repository) => (
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
