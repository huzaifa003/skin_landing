import React, { useState, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline, Box, styled } from '@mui/material';
import ToggleCustomTheme from '../src/components/ToggleCustomTheme';
import LandingPage from './LandingPage'; // Assume you have a LandingPage component
import getLPTheme from './getLPTheme'; // Adjust the path to your theme file
import './App.css';
import Login from './Login';
import Signup from './Signup';
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

  return (
    <div style={{ width: '100%' }}>
      <Router>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <StyledBox style={{ display: 'flex', justifyContent: 'center' }}>
            
            <Routes>
              <Route path="/skin_landing" element={<LandingPage />} />
              <Route path="/skin_landing/login" element={<Login />} />
              <Route path="/skin_landing/signup" element={<Signup />} />
            </Routes>
            <ToggleCustomTheme
              showCustomTheme={showCustomTheme}
              toggleCustomTheme={toggleCustomTheme}
            />
          </StyledBox>
        </ThemeProvider>
      </Router>
    </div>
  );
}

export default App;
