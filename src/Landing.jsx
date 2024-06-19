import React from 'react';
import { Box, Button, Typography, Paper, Container, useTheme } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

function Landing() {
    const theme = useTheme(); // Access theme to use in conditional styling

    return (
        <Container maxWidth="lg">
            <Paper elevation={6} style={{
                marginTop: 50,
                padding: 30,
                backgroundColor: theme.palette.background.paper,
                color: theme.palette.text.primary
            }}>
                <Typography variant="h3" component="h1" gutterBottom>
                    Welcome to DermaAssist
                </Typography>
                <Typography variant="h5" gutterBottom>
                    Help the system while helping the patient.
                </Typography>
                <Typography variant="body1" paragraph>
                    Introducing DermaAssist, an AI-based assistant designed to identify skin diseases, facilitate
                    consultations with comprehensive handbooks, and much more. Our platform empowers dermatologists
                    to deliver enhanced patient care through advanced technology.
                </Typography>
                <Box mt={4} display="flex" justifyContent="space-around">
                    <Button variant="contained" color="primary" component={RouterLink} to="/signup">
                        Register
                    </Button>
                    <Button variant="outlined" color="primary" component={RouterLink} to="/login">
                        Login
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
}

export default Landing;
