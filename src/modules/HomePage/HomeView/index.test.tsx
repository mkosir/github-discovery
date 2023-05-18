import { screen } from '@testing-library/react';

import { renderWithTheme } from 'common/test';
import { mockRepositories } from 'common/test/mocks';

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

        expect(screen.getByText('GitHub Discovery')).toBeInTheDocument();

        const renderedRepositories = await screen.findAllByRole('listitem');
        expect(renderedRepositories.length).toBe(mockRepositories.length);

        const favouritedRepositories = screen.getAllByTestId('favourited-icon');
        expect(favouritedRepositories.length).toBe(favouritedRepositoryIds.length);
      });
    });
  });
});
