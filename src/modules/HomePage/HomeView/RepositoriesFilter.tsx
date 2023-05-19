import { Box, Checkbox, Typography, Select, MenuItem, FormControlLabel } from '@mui/material';

import { GITHUB_AVAILABLE_LANGUAGES, GitHubAvailableLanguages } from '../useGetRepositories/service';

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
        <FormControlLabel
          control={
            <Checkbox checked={areFavouritesFiltered} onChange={(event) => onChangeFavourites(event.target.checked)} />
          }
          label="Favourites:"
          labelPlacement="start"
        />
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
