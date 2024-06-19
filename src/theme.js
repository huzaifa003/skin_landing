import { createTheme } from '@mui/material/styles';

export const getTheme = (mode) => createTheme({
  palette: {
    mode,
    ...(mode === 'dark' ? {
      background: {
        default: '#121212',
        paper: '#424242',
      },
      text: {
        primary: '#ffffff',
        secondary: '#eceff1',
      },
    } : {
      background: {
        default: '#ffffff',
        paper: '#ffffff',
      },
      text: {
        primary: '#0d0d0d',
        secondary: '#555555',
      },
    }),
  },
});
