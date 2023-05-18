import { updateFavourites, UpdateFavouritesReturn } from '.';

describe('modules', () => {
  describe('HomePage', () => {
    describe('updateFavourites', () => {
      it('should return  favourites array with added repository id, when this repository id do not exist yet', () => {
        const favouriteRepositoryIds = [111];
        const repositoryId = 222;

        expect(updateFavourites({ favouriteRepositoryIds, repositoryId })).toStrictEqual<UpdateFavouritesReturn>([
          111, 222,
        ]);
      });

      it('should return  favourites array with removed repository id, when this repository id already exists', () => {
        const favouriteRepositoryIds = [111, 222];
        const repositoryId = 222;

        expect(updateFavourites({ favouriteRepositoryIds, repositoryId })).toStrictEqual<UpdateFavouritesReturn>([111]);
      });
    });
  });
});
