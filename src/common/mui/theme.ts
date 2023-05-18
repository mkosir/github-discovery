import { createTheme } from '@mui/material';

const customFontFamily = "'Roboto', 'Helvetica', 'Arial', sans-serif";

export const theme = createTheme({
  // Theme
  brand: {
    orangeLight: '#E94E1B',
    orangeDark: '#A73610',
    greenLight: '#9BBE1D',
    greenDark: '#006C3A',
  },

  // Palette
  palette: {
    primary: { main: '#006C3A', dark: '#004726', light: '#9BBE1D' },
    secondary: { main: '#E94E1B', dark: '#A73610' },
  },

  typography: {
    fontFamily: customFontFamily,
  },

  components: {
    MuiTypography: {
      defaultProps: {
        fontFamily: customFontFamily,
      },
    },

    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
  },
});
