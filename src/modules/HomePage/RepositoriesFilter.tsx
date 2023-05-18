import { Box, Checkbox, Typography, Select, MenuItem } from '@mui/material';

import { GITHUB_AVAILABLE_LANGUAGES, GitHubAvailableLanguages } from './useGetRepositories/service';

export type RepositoriesFilterProps = {
  areFavouritesFiltered: boolean;
  onChangeFavourites: (areFavouritesFiltered: boolean) => void;
  language: GitHubAvailableLanguages;
  onChangeLanguage: (language: GitHubAvailableLanguages) => void;
};

export const RepositoriesFilter = ({
  areFavouritesFiltered,
  onChangeFavourites,
  language,
  onChangeLanguage,
}: RepositoriesFilterProps) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
        <Typography variant="body2">Favourites:</Typography>
        <Checkbox checked={areFavouritesFiltered} onChange={(event) => onChangeFavourites(event.target.checked)} />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="body2">Language:</Typography>
        <Select
          value={language}
          onChange={(event) => onChangeLanguage(event.target.value as GitHubAvailableLanguages)}
          size="small"
          sx={{ ml: 1, minWidth: '150px' }}
        >
          {GITHUB_AVAILABLE_LANGUAGES.map((availableLanguage) => (
            <MenuItem key={availableLanguage} value={availableLanguage}>
              {availableLanguage}
            </MenuItem>
          ))}
        </Select>
      </Box>
    </Box>
  );
};
