import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithTheme } from 'common/test';
import { mockRepositories } from 'common/test/mocks';

import { GitHubAvailableLanguages } from '../useGetRepositories/service';

import { HomeView } from './';

describe('modules', () => {
  describe('HomePage', () => {
    describe('HomeView', () => {
      it('should render HomeView component, with all the repositories and no favourites when default props are given', async () => {
        const onChangeFavourites = jest.fn();
        const onChangeFavouriteFilter = jest.fn();
        const onChangeLanguageFilter = jest.fn();

        renderWithTheme(
          <HomeView
            repositories={mockRepositories}
            isFetching={false}
            areFavouritesFiltered={false}
            languageFilter="All"
            favouriteRepositoryIds={[]}
            onChangeFavourites={onChangeFavourites}
            onChangeFavouriteFilter={onChangeFavouriteFilter}
            onChangeLanguageFilter={onChangeLanguageFilter}
          />,
        );

        expect(screen.getByText('GitHub Discovery')).toBeInTheDocument();

        const renderedRepositories = await screen.findAllByRole('listitem');
        expect(renderedRepositories.length).toBe(mockRepositories.length);

        expect(screen.queryByTestId('favourited-icon')).not.toBeInTheDocument();

        expect(onChangeFavourites).not.toBeCalled();
        expect(onChangeFavouriteFilter).not.toBeCalled();
        expect(onChangeLanguageFilter).not.toBeCalled();
      });

      it('should render all repositories and mark favourites when repositories are being favourited', async () => {
        const favouritedRepositoryIds = [mockRepositories[0].id, mockRepositories[2].id];

        renderWithTheme(
          <HomeView
            repositories={mockRepositories}
            isFetching={false}
            areFavouritesFiltered={false}
            languageFilter="All"
            favouriteRepositoryIds={favouritedRepositoryIds}
            onChangeFavourites={jest.fn()}
            onChangeFavouriteFilter={jest.fn()}
            onChangeLanguageFilter={jest.fn()}
          />,
        );

        const renderedRepositories = await screen.findAllByRole('listitem');
        expect(renderedRepositories.length).toBe(mockRepositories.length);

        const favouritedRepositories = screen.getAllByTestId('favourited-icon');
        expect(favouritedRepositories.length).toBe(favouritedRepositoryIds.length);
      });

      it('should render only favourites repositories when favourites are selected as filtering option', async () => {
        const favouritedRepositoryIds = [mockRepositories[0].id, mockRepositories[2].id];

        renderWithTheme(
          <HomeView
            repositories={mockRepositories}
            isFetching={false}
            areFavouritesFiltered={true}
            languageFilter="All"
            favouriteRepositoryIds={favouritedRepositoryIds}
            onChangeFavourites={jest.fn()}
            onChangeFavouriteFilter={jest.fn()}
            onChangeLanguageFilter={jest.fn()}
          />,
        );

        const renderedRepositories = await screen.findAllByRole('listitem');
        expect(renderedRepositories.length).toBe(favouritedRepositoryIds.length);
      });

      it('should trigger callbacks with correct parameters when interacted on UI', async () => {
        const onChangeFavourites = jest.fn();
        const onChangeFavouriteFilter = jest.fn();
        const onChangeLanguageFilter = jest.fn();

        renderWithTheme(
          <HomeView
            repositories={mockRepositories}
            isFetching={false}
            areFavouritesFiltered={false}
            languageFilter="All"
            favouriteRepositoryIds={[]}
            onChangeFavourites={onChangeFavourites}
            onChangeFavouriteFilter={onChangeFavouriteFilter}
            onChangeLanguageFilter={onChangeLanguageFilter}
          />,
        );

        const favouritesCheckbox = screen.getByRole('checkbox', { name: 'Favourites:' });
        await userEvent.click(favouritesCheckbox);
        expect(onChangeFavouriteFilter).toBeCalledWith<[boolean]>(true);

        const languageSelect = screen.getByRole('button', { name: 'All' });
        await userEvent.click(languageSelect);
        const languageTypescriptSelect = screen.getByRole('option', { name: 'TypeScript' });
        await userEvent.click(languageTypescriptSelect);
        expect(onChangeLanguageFilter).toBeCalledWith<[GitHubAvailableLanguages]>('TypeScript');

        const firstNotFavouritedIcon = screen.getAllByTestId('not-favourited-icon')[0];
        await userEvent.click(firstNotFavouritedIcon);
        expect(onChangeFavourites).toBeCalled();
      });
    });
  });
});
