/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { CSSProperties } from 'react';

declare module '@mui/material/styles' {
  // Theme
  interface Theme {
    brand: {
      orangeLight: CSSProperties['color'];
      orangeDark: CSSProperties['color'];
      greenLight: CSSProperties['color'];
      greenDark: CSSProperties['color'];
    };
  }

  interface ThemeOptions {
    brand: {
      orangeLight: CSSProperties['color'];
      orangeDark: CSSProperties['color'];
      greenLight: CSSProperties['color'];
      greenDark: CSSProperties['color'];
    };
  }
}
