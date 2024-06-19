import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/system';

const whiteLogos = [
  'https://cdn-icons-png.flaticon.com/512/9240/9240330.png',
  'https://www.tensorflow.org/static/site-assets/images/marketing/learn/learn-hero.svg',
  'https://cdn.iconscout.com/icon/free/png-256/free-firebase-3626998-3029476.png',
  'https://www.gstatic.com/devrel-devsite/prod/vc5df62aff689c916c31b2ac1e49a7e8c5ecada1bb13dcdd68aaefb1e1e9b9ec0/tensorflow/images/lockup.svg',
  
  
];

const darkLogos = [
  'https://cdn-icons-png.flaticon.com/512/11522/11522572.png',
  'https://www.tensorflow.org/static/site-assets/images/marketing/learn/learn-hero.svg',
  'https://cdn.iconscout.com/icon/free/png-256/free-firebase-3626998-3029476.png',
  'https://www.gstatic.com/devrel-devsite/prod/vc5df62aff689c916c31b2ac1e49a7e8c5ecada1bb13dcdd68aaefb1e1e9b9ec0/tensorflow/images/lockup.svg',
  
  
];

const logoStyle = {
  width: '100px',
  height: '80px',
  margin: '0 32px',
  opacity: 0.7,
};

export default function LogoCollection() {
  const theme = useTheme();
  const logos = theme.palette.mode === 'light' ? darkLogos : whiteLogos;

  return (
    <Box id="logoCollection" sx={{ py: 4 }}>
      <Typography
        component="p"
        variant="subtitle2"
        align="center"
        color="text.secondary"
      >
        Powered by cutting edge technology
      </Typography>
      <Grid container justifyContent="center" sx={{ mt: 0.5, opacity: 0.6 }}>
        {logos.map((logo, index) => (
          <Grid item key={index}>
            <img
              src={logo}
              alt={`Fake company number ${index + 1}`}
              style={logoStyle}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
