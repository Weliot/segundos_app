import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2c5484',
      contrastText: '#fff'
    },
    secondary: {
      main: '#6c04b4',
      contrastText: '#fff'
    },
    // Outras customizações opcionais:
    error: { main: '#c40007' },
    warning: { main: '#c4740c' },
    success: { main: '#56ba6f' }
  },
  typography: {
    fontFamily: [
      '"Rubik"',
      'sans-serif',
    ].join(','),
  },
  components: {
    
  }
});

export default theme;