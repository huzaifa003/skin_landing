import React, { useState, useMemo, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline, Box, styled } from '@mui/material';
import ToggleCustomTheme from '../src/components/ToggleCustomTheme';
import LandingPage from './LandingPage'; // Assume you have a LandingPage component
import getLPTheme from './getLPTheme'; // Adjust the path to your theme file
import './App.css';
import Login from './Login';
import Signup from './Signup';
import Communities from './components/Communities';
import Admin from './Admin'
import UserReports from './UserReports'

import ModeContext from './context/ModeContext';
const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%', // Ensures it covers full width
  padding: theme.spacing(3), // Adjusts padding, can be omitted if not needed
}));



function App() {

  const lightColorScheme = {
    primary: '#6200ee',
    primaryVariant: '#3700b3',
    secondary: '#03dac6',
    background: '#ffffff',
    surface: '#ffffff',
    error: '#b00020',
    text: '#000000',
    onPrimary: '#ffffff',
    onSecondary: '#000000',
    onBackground: '#000000',
    onSurface: '#000000',
    onError: '#ffffff',
  };
  
  const darkColorScheme = {
    primary: '#bb86fc',
    primaryVariant: '#3700b3',
    secondary: '#03dac6',
    background: '#121212',
    surface: '#333333',
    error: '#cf6679',
    text: '#ffffff',
    onPrimary: '#000000',
    onSecondary: '#000000',
    onBackground: '#ffffff',
    onSurface: '#ffffff',
    onError: '#000000',
  };

  
  const typography = {
    fontFamily: 'Roboto, "Helvetica Neue", Arial, sans-serif',
    h1: {
      fontWeight: 500,
      fontSize: '2.25rem',
    },
    h2: {
      fontWeight: 500,
      fontSize: '2rem',
    },
    h3: {
      fontWeight: 500,
      fontSize: '1.75rem',
    },
    h4: {
      fontWeight: 500,
      fontSize: '1.5rem',
    },
    h5: {
      fontWeight: 500,
      fontSize: '1.25rem',
    },
    h6: {
      fontWeight: 500,
      fontSize: '1rem',
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 400,
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
    },
    button: {
      fontSize: '0.875rem',
      fontWeight: 500,
      textTransform: 'uppercase',
    },
    caption: {
      fontSize: '0.75rem',
      fontWeight: 400,
    },
    overline: {
      fontSize: '0.625rem',
      fontWeight: 400,
      textTransform: 'uppercase',
    },
  };

  

  







function createModeTheme(mode = 'light') {
  const colorScheme = mode === 'light' ? lightColorScheme : darkColorScheme;

  return createTheme({
    palette: {
      mode: mode,
      primary: {
        main: colorScheme.primary,
        contrastText: colorScheme.onPrimary,
      },
      secondary: {
        main: colorScheme.secondary,
        contrastText: colorScheme.onSecondary,
      },
      error: {
        main: colorScheme.error,
        contrastText: colorScheme.onError,
      },
      background: {
        default: colorScheme.background,
        paper: colorScheme.surface,
      },
      text: {
        primary: colorScheme.onBackground,
        secondary: colorScheme.onSurface,
      },
    },
    typography: typography,
  });
}

  const [showCustomTheme, setShowCustomTheme] = useState(true);

  const theme = useMemo(() => {
    return createTheme(showCustomTheme ? getLPTheme('light') : {
      // Default Material Design theme settings
      palette: {
        type: 'light',
        primary: { main: '#1976d2' },
        secondary: { main: '#dc004e' },
      },
      // Additional default properties if necessary
    });
  }, [showCustomTheme]);

  const toggleCustomTheme = (event, newTheme) => {
    if (newTheme !== null) {
      setShowCustomTheme(newTheme);
    }
  };

  
  const [mode, setMode] = React.useState('light');
  const mateiralTheme = createTheme({ palette: { mode: mode } });
  return (
    <div style={{ width: '100%' }}>
      <Router>
        <ModeContext.Provider value={{ mode, setMode }}>
        <ThemeProvider theme={createModeTheme(mode)}>
          <CssBaseline />
         
            
            <Routes>
              <Route path="*" element={<LandingPage theme={createModeTheme(mode)}  />} />
              <Route path="/skin_landing/login" element={<Login />} />
              <Route path="/skin_landing/signup" element={<Signup />} />
              <Route path="/skin_landing/communities" element={<Communities />} />
              <Route path="/skin_landing/admin" element={<Admin />} />
              <Route path="/skin_landing/reports" element={<UserReports />} />

            </Routes>
            
        
        </ThemeProvider>
        </ModeContext.Provider>
      </Router>

      
    </div>
  );
}

export default App;