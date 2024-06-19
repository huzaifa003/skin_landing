import React from 'react';
import { TextField, Button, Paper, Box } from '@mui/material';

function Login() {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <Paper style={{ padding: 32 }}>
        <form>
          <TextField fullWidth label="Email" type="email" margin="normal" />
          <TextField fullWidth label="Password" type="password" margin="normal" />
          <Button fullWidth variant="contained" color="primary" style={{ marginTop: 16 }}>
            Login
          </Button>
        </form>
      </Paper>
    </Box>
  );
}

export default Login;
