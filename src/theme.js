import { createTheme } from '@mui/material/styles';

const getTheme = (mode) => createTheme({
  palette: {
    mode,
    primary: {
      main: mode === 'light' ? '#2196f3' : '#90caf9',
      light: mode === 'light' ? '#64b5f6' : '#e3f2fd',
      dark: mode === 'light' ? '#1976d2' : '#42a5f5',
      lighter: mode === 'light' ? '#e3f2fd' : 'rgba(33, 150, 243, 0.1)',
      contrastText: mode === 'light' ? '#fff' : '#000',
    },
    secondary: {
      main: mode === 'light' ? '#9c27b0' : '#ce93d8',
      light: mode === 'light' ? '#ba68c8' : '#f3e5f5',
      dark: mode === 'light' ? '#7b1fa2' : '#ab47bc',
      contrastText: mode === 'light' ? '#fff' : '#000',
    },
    error: {
      main: mode === 'light' ? '#f44336' : '#ef5350',
      light: mode === 'light' ? '#e57373' : '#f44336',
      dark: mode === 'light' ? '#d32f2f' : '#c62828',
      lighter: mode === 'light' ? '#ffebee' : 'rgba(244, 67, 54, 0.1)',
    },
    warning: {
      main: mode === 'light' ? '#ff9800' : '#ffa726',
      light: mode === 'light' ? '#ffb74d' : '#ffb74d',
      dark: mode === 'light' ? '#f57c00' : '#f57c00',
      lighter: mode === 'light' ? '#fff3e0' : 'rgba(255, 152, 0, 0.1)',
    },
    info: {
      main: mode === 'light' ? '#03a9f4' : '#29b6f6',
      light: mode === 'light' ? '#4fc3f7' : '#4fc3f7',
      dark: mode === 'light' ? '#0288d1' : '#0288d1',
      lighter: mode === 'light' ? '#e1f5fe' : 'rgba(3, 169, 244, 0.1)',
    },
    success: {
      main: mode === 'light' ? '#4caf50' : '#66bb6a',
      light: mode === 'light' ? '#81c784' : '#81c784',
      dark: mode === 'light' ? '#388e3c' : '#388e3c',
      lighter: mode === 'light' ? '#e8f5e9' : 'rgba(76, 175, 80, 0.1)',
    },
    background: {
      default: mode === 'light' ? '#f5f5f5' : '#121212',
      paper: mode === 'light' ? '#ffffff' : '#1e1e1e',
    },
    text: {
      primary: mode === 'light' ? 'rgba(0, 0, 0, 0.87)' : '#ffffff',
      secondary: mode === 'light' ? 'rgba(0, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.7)',
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: `0 4px 20px ${mode === 'light' ? 'rgba(0,0,0,0.1)' : 'rgba(0,0,0,0.4)'}`,
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 500,
    },
    subtitle1: {
      fontWeight: 500,
    },
  },
});

export default getTheme; 