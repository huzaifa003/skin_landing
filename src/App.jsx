import React, { useState, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import ModeContext from './context/ModeContext';

import LandingPage from './LandingPage'; // Import your LandingPage component
import Login from './Login';
import Signup from './Signup';
import Admin from './Admin'; // Make sure the Admin component is correctly imported
import getLPTheme from './getLPTheme'; // Import your theme function
import UserReports from './UserReports';

// Function to create theme based on mode
function createModeTheme(mode = 'light') {
  const colorScheme = mode === 'light' ? getLPTheme('light') : getLPTheme('dark');
  return createTheme({
    palette: {
      mode,
      ...colorScheme.palette,
    },
    typography: colorScheme.typography,
  });
}

function App() {
  const [mode, setMode] = useState('light');
  const [showCustomTheme, setShowCustomTheme] = useState(true);

  const theme = useMemo(() => createModeTheme(mode), [mode, showCustomTheme]);

  // Simple theme without complex customization for Admin
  const adminTheme = createTheme({
    palette: {
      mode: 'light', // or 'dark' depending on your preference for Admin
    }
  });

  return (
    <Router>
      <div style={{ width: '100%' }}>
        <ModeContext.Provider value={{ mode, setMode }}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/skin_landing/login" element={<Login />} />
              <Route path="/skin_landing/signup" element={<Signup />} />
            </Routes>
          </ThemeProvider>
        </ModeContext.Provider>

        {/* Admin route with a different theme */}
      
          <Routes>
            <Route path="/skin_landing/admin" element={<Admin />} />
            <Route path='/skin_landing/reports' element={<UserReports/>}></Route>
          </Routes>
       
      </div>
    </Router>
  );
}

export default App;
