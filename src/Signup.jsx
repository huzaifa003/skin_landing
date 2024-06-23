import React from 'react';
import { TextField, Button, Paper, Box, Typography, useTheme } from '@mui/material';

function Signup() {
  const theme = useTheme(); // Accessing the theme

  // Example usage of theme: Adjust styles based on the theme's mode
  const paperStyle = {
    padding: 32,
    maxWidth: 400,
    width: '100%',
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.background.paper : '#fff', // Conditional background
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <Paper style={paperStyle}>
        <form>
          <Typography variant="h5" component="h1" gutterBottom>
            Sign Up
          </Typography>
          <TextField fullWidth label="Email" type="email" margin="normal" />
          <TextField fullWidth label="Password" type="password" margin="normal" />
          <Button fullWidth variant="contained" color="primary" style={{ marginTop: 16 }}>
            Sign Up
          </Button>
        </form>
      </Paper>
    </Box>
  );
}

export default Signup;
