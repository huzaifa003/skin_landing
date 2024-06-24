import React from 'react';
import { TextField, Button, Paper, Box, Typography } from '@mui/material';
import ModeContext from './context/ModeContext';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import backgroundImg from '../src/assets/backgroundMedical.jpg'; 

function Login() {
  const { mode } = React.useContext(ModeContext);

  const pageStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '120vh',
    position:'absolute',
    backgroundImage: `url(${backgroundImg})`,
    backgroundSize: 'repeat',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    width: '100vw',
    height: '100vh',
    margin: 0,
    padding :0,
    
  };

  const paperStyle = {
    maxWidth: '400px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: mode === 'dark' ? 'rgba(30, 30, 30, 0.7)' : 'rgba(255, 255, 255, 0.7)',
    backdropFilter: 'blur(10px)',
    color: mode === 'dark' ? 'white' : 'black',
    padding: '30px',
    borderRadius: '10px',
    border: '1px solid rgba(255, 255, 255, 0.3)'
  };

  return (
    <div style={pageStyle}>
      <Paper elevation={6} style={paperStyle}>
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>
        <form>
          <TextField
            fullWidth
            label="Email"
            type="email"
            margin="normal"
            InputProps={{
              startAdornment: <EmailIcon color="primary" />,
            }}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            InputProps={{
              startAdornment: <LockIcon color="primary" />,
            }}
            variant="outlined"
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            style={{ marginTop: '16px', padding: '12px 0' }}
          >
            Login
          </Button>
        </form>
      </Paper>
    </div>
  );
}

export default Login;
