import * as React from 'react';
import { alpha } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import AppleIcon from '@mui/icons-material/Apple';
import AndroidIcon from '@mui/icons-material/Android';
import GroupAddIcon from '@mui/icons-material/GroupAdd';

export default function Hero() {
  return (
    <Box
      id="hero"
      sx={(theme) => ({
        width: '100%',
        backgroundImage:
          theme.palette.mode === 'light'
          ? 'linear-gradient(180deg, #CEE5FD, #FFF)'
          : 'linear-gradient(180deg, #02294F, rgba(9, 14, 16, 0.0))',
        backgroundSize: '100% 20%',
        backgroundRepeat: 'no-repeat',
      })}
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12, xl: 2},
        }}
      >
        <Stack spacing={2} sx={{ width: { xs: '100%', sm: '70%' } }}>
          <Typography
            variant="h1"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignSelf: 'center',
              textAlign: 'center',
              fontSize: 'clamp(4rem, 10vw, 5rem)',
            }}
          >
            AI&nbsp;
            <Typography
              component="span"
              variant="h1"
              sx={{
                fontSize: 'clamp(3.5rem, 10vw, 4.5rem)',
                color: (theme) =>
                  theme.palette.mode === 'light' ? 'primary.main' : 'primary.light',
              }}
            >
              Assistant Dermatologist
            </Typography>
          </Typography>
          <Typography
            textAlign="center"
            color="text.secondary"
            sx={{ alignSelf: 'center', width: { sm: '100%', md: '80%' } }}
          >
            Join the cutting-edge solution that is revolutionizing the dermatology industry.
          </Typography>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            alignSelf="center"
            spacing={1}
            sx={{ pt: 2, width: { xs: '100%', sm: 'auto' } }}
          >
            <Button
              variant="contained"
              color="primary"
              startIcon={<GroupAddIcon />}
              sx={{ fontSize: '1rem', padding: '10px 20px' }}
            >
              Join Our Community
            </Button>

          </Stack>
          <Typography variant="caption" textAlign="center" sx={{ opacity: 0.8 }}>
            By clicking "Join Our Community" you agree to our&nbsp;
            <Link href="#" color="primary">
              Terms & Conditions
            </Link>
            .
          </Typography>
          
          <Typography
            variant="body1"
            style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}
            sx={{ alignSelf: 'center', mt: { xs: 1, sm: 0 } }}
          >
            Download the app:
            <Link href="#" color="primary" sx={{ display: 'flex', alignItems: 'center', ml: 1 }}>
              <AppleIcon sx={{ mr: 0.5 }} /> iOS
            </Link>
            &nbsp;or&nbsp;
            <Link href="#" color="primary" sx={{ display: 'flex', alignItems: 'center' }}>
              <AndroidIcon sx={{ mr: 0.5 }} /> Android
            </Link>
          </Typography>
         
        </Stack>
      </Container>
    </Box>
  );
}
