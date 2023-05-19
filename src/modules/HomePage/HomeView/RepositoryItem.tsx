import { Star as StarIcon, Bookmark as BookmarkIcon, BookmarkBorder as BookmarkBorderIcon } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';

export type RepositoryItemProps = {
  name: string;
  description: string;
  url: string;
  numOfStars: number;
  language: string;
  isFavourited: boolean;
  onChangeFavourite: () => void;
};

export const RepositoryItem = ({
  name,
  description,
  url,
  numOfStars,
  language,
  isFavourited,
  onChangeFavourite,
}: RepositoryItemProps) => {
  return (
    <Box role="listitem" sx={{ border: '1px solid lightgray', borderRadius: '8px', p: 1 }}>
      <Box sx={{ display: 'flex' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            mr: 1,
            '&:hover': {
              cursor: 'pointer',
            },
          }}
          onClick={onChangeFavourite}
        >
          {isFavourited ? (
            <BookmarkIcon data-testid="favourited-icon" />
          ) : (
            <BookmarkBorderIcon data-testid="not-favourited-icon" />
          )}
        </Box>
        <a href={url} target="_blank" rel="noopener noreferrer">
          <Typography variant="h6">{name}</Typography>
        </a>
      </Box>
      <Typography sx={{ fontStyle: 'italic' }}>{description}</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="body2" mr={1}>
          {language}
        </Typography>
        <Typography variant="subtitle1">{numOfStars}</Typography>
        <StarIcon sx={{ fontSize: '16px' }} />
      </Box>
    </Box>
  );
};
