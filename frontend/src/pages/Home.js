import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Home = () => {
    return (
        <Container sx={{ mt: 8, textAlign: 'center' }}>
            <Typography variant="h2" gutterBottom>
                Build Your Dream Website
            </Typography>
            <Typography variant="h5" color="textSecondary" paragraph>
                Create stunning websites with our intuitive drag-and-drop builder.
            </Typography>
            <Box sx={{ mt: 4 }}>
                <Button variant="contained" color="primary" component={RouterLink} to="/signup" sx={{ mr: 2 }}>
                    Get Started
                </Button>
                <Button variant="outlined" color="primary" component={RouterLink} to="/templates">
                    View Templates
                </Button>
            </Box>
        </Container>
    );
};

export default Home;