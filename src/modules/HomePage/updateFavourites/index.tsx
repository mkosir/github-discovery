type UpdateFavouritesParams = {
  favouriteRepositoryIds: ReadonlyArray<number>;
  repositoryId: number;
};
export type UpdateFavouritesReturn = Array<number>;

export const updateFavourites = ({
  favouriteRepositoryIds,
  repositoryId,
}: UpdateFavouritesParams): UpdateFavouritesReturn => {
  const repositoryIdIndex = favouriteRepositoryIds.indexOf(repositoryId);

  if (repositoryIdIndex !== -1) {
    const favouriteRepositoryIdsFiltered = favouriteRepositoryIds.filter(
      (favouriteRepositoryId) => favouriteRepositoryId !== repositoryId,
    );
    return favouriteRepositoryIdsFiltered;
  }

  return [...favouriteRepositoryIds, repositoryId];
};
